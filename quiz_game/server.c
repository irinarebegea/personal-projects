#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <signal.h>
#include <pthread.h>
#include <math.h>
#include <sys/types.h>

/* gcc -o server server.c -lpthread -lsqlite3 */
#include <sqlite3.h>


#define PORT 2908 /* used port */
#define NMAX 100

extern int errno; /* error code returned by some calls */

typedef struct thData {
	int idThread; /* id of the thread kept by the program */
	int cl; /* descriptor returned by accept */
} thData;

struct players {
	char username[NMAX];
	int points;
	int status;
}
player[NMAX];

int registered_user[NMAX];
int started_game[NMAX];
int game_over[NMAX];
int left[NMAX];
int player_number = 0;
int ok = 1;
int highscore = 0;
char winner[256];
int last_thread = 0;

int callback(void*, int, char**, char**);
void register_user(void*);
void start_game(void*);
void play_game(void*);
void get_object(int, sqlite3*, void* arg);
static void* treat(void*);
void check_answer(int, sqlite3*, void*, char*);

int main()
{
	sigaction(SIGPIPE, &(struct sigaction){SIG_IGN}, NULL);


	struct sockaddr_in server;	
	struct sockaddr_in from;
	int sd;		
	pthread_t th[100];
	int i = 0;


	/* creating a socket */
	if ((sd = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
		perror("[server] socket() error.\n");
		return errno;
	}
	/* using SO_REUSEADDR option */
	int on = 1;
	setsockopt(sd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));

	/* preparing data structures */
	bzero(&server, sizeof(server));
	bzero(&from, sizeof(from));

	/* populating the data structure used by the server */
	/* establishing the socket family */
	server.sin_family = AF_INET;
	/* accepting every address */
	server.sin_addr.s_addr = htonl(INADDR_ANY);
	/* using a user port */
	server.sin_port = htons(PORT);

	/* binds the socket */
	if (bind(sd, (struct sockaddr*)&server, sizeof(struct sockaddr)) == -1) {
		perror("[server] bind() error.\n");
		return errno;
	}

	/* makes the server listen for new clients */

	if (listen(sd, SOMAXCONN) == -1) {
		perror("[server] listen() error.\n");
		return errno;
	}

	while (1) {
		int client;
		thData* td;
		int length = sizeof(from);

		printf("[server] Waiting at the port %d...\n", PORT);
		fflush(stdout);

		/* accepts a client (blocking state until establishing connection) */
		if ((client = accept(sd, (struct sockaddr*)&from, &length)) < 0) {
			perror("[server] accept() error.\n");
			continue;
		}

		/* the connection was established, waiting for messsage */


		td = (struct thData*)malloc(sizeof(struct thData));

		td->idThread = i++;
		td->cl = client;

		pthread_create(&th[i], NULL, &treat, td);

	} // while

};
static void* treat(void* arg) {
	/*
	* Function implemented by every thread, in which all other functions are called.
	*/
	char i = 49;
	int value;
	int ret = 1;
	char buff[256] = { 0 };
	char buff2[256] = { 0 };
	struct thData tdL;
	tdL = *((struct thData*)arg);
	pthread_detach(pthread_self());
	while (1) {
		ok = 1;
		highscore = 0;

		if (registered_user[tdL.idThread] == 0) {
			printf("[thread %d] Taking the username from the user...\n", tdL.idThread);
			register_user((struct thData*)arg);
			printf("[thread %d] The player with the username %s has been registered.\n", tdL.idThread, player[tdL.idThread].username);
			player_number++;
		}

		else if (registered_user[tdL.idThread] == 1) {
			if (started_game[tdL.idThread] == 0 && game_over[tdL.idThread] == 0) {
				printf("[thread %d] Checking the start of the game...\n", tdL.idThread);
				start_game((struct thData*)arg);
			}

			else if (started_game[tdL.idThread] == 0 && game_over[tdL.idThread] == 1) {
				player_number--;
				pthread_exit(NULL);
			}


			else if (started_game[tdL.idThread] == 1 && game_over[tdL.idThread] == 0) {
				printf("[thread %d] Game status: %d\n", tdL.idThread, game_over[tdL.idThread]);
				play_game((struct thData*)arg);
				printf("[thread %d] Game status: %d\n", tdL.idThread, game_over[tdL.idThread]);
			}

			else {
				for (i = 0; i < player_number; i++) {
					if (game_over[i] == 0)
						ok = 0;
				}
				if (ok == 1) {
					printf("[server] The score can be printed.\n");
					if (write(tdL.cl, "Wait for the winner to be announced...\n", 40) <= 0) {
						printf("[Thread %d]\n", tdL.idThread);
						perror("[Thread] write() error to client.\n");
						game_over[tdL.idThread] = 1;
						left[tdL.idThread] = 1;
					}

					for (tdL.idThread = 0; tdL.idThread < player_number; tdL.idThread++) {
						if (left[tdL.idThread] == 0) {
							if (player[tdL.idThread].points >= highscore) {
								highscore = player[tdL.idThread].points;
								memset(winner, 0, sizeof(winner));
								strcpy(winner, player[tdL.idThread].username);

							}
						}
					}


					if (write(tdL.cl, winner, sizeof(winner)) <= 0) {
						printf("[Thread %d]\n", tdL.idThread);
						perror("[Thread] write() error to client.\n");
						game_over[tdL.idThread] = 1;
						left[tdL.idThread] = 1;
					}
					left[tdL.idThread] = 1;
					player[tdL.idThread].status = 1;
					player[tdL.idThread].points = 0;

					pthread_exit(NULL);
				}

				else {
					printf("[server] Wait a bit longer...\n");
					if (write(tdL.cl, "Wait for the winner to be announced...\n", 40) <= 0) {
						printf("[Thread %d]\n", tdL.idThread);
						perror("[Thread] write() error to client.\n");
						game_over[tdL.idThread] = 1;
						left[tdL.idThread] = 1;

					}
					sleep(3);
				}
			}
		}
	} /* while */

	pthread_exit(NULL);
	return(NULL);

};

void register_user(void* arg)
{
	/*
	* Receives a username from the player and stores it.
	*/
	char buff[256];
	memset(buff, 0, sizeof(buff));

	struct thData tdL;
	tdL = *((struct thData*)arg);

	memset(player[tdL.idThread].username, 0, sizeof(player[tdL.idThread].username));

	if (write(tdL.cl, "Welcome! Please choose a username: ", 36) <= 0) {
		printf("[Thread %d]\n", tdL.idThread);
		perror("[Thread] write() error to client.\n");
		game_over[tdL.idThread] = 1;
		left[tdL.idThread] = 1;
	}
	read(tdL.cl, buff, sizeof(buff));

	strcpy(player[tdL.idThread].username, buff);
	registered_user[tdL.idThread] = 1;

	if (write(tdL.cl, "Registration completed.\n", 25) <= 0) {
		printf("[Thread %d]\n", tdL.idThread);
		perror("[Thread] write() to client.\n");
		game_over[tdL.idThread] = 1;
		left[tdL.idThread] = 1;
	}
	printf("The player's username is: %s", player[tdL.idThread].username);

}

void start_game(void* arg)
{
	/*
	* Checks if the player wants to start the game. 
	* If yes, it marks the game as started.
	* If no, it deletes all the info about the player and it marks the game as finished.
	*/
	char buff1[256];
	memset(buff1, 0, sizeof(buff1));

	struct thData tdL;
	tdL = *((struct thData*)arg);

	if (write(tdL.cl, "Would you like to start the game? [y/n]\n", 41) <= 0) {
		printf("[Thread %d]\n", tdL.idThread);
		perror("[Thread] write() error to client.\n");
		game_over[tdL.idThread] = 1;
		left[tdL.idThread] = 1;
		pthread_exit(NULL);
	}

	if (read(tdL.cl, buff1, sizeof(buff1)) < 0) {
		printf("[Thread %d]\n", tdL.idThread);
		perror("read() error from client.\n");
	}


	printf("[thread %d] I received the message %s\n", tdL.idThread, buff1);
	if (strchr(buff1, 'y') != 0) {
		started_game[tdL.idThread] = 1;
		if (write(tdL.cl, "The game is about to start.\n", 29) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;
			pthread_exit(NULL);
		}

		printf("[thread %d] The game is about to start.\n", tdL.idThread);

	}

	else if (strchr(buff1, 'n') != 0) {
		started_game[tdL.idThread] = 0;
		game_over[tdL.idThread] = 1;
		if (write(tdL.cl, "You have been disqualified.\n", 29) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;
			pthread_exit(NULL);
		}
		printf("[thread %d] The player has been disqualified.\n", tdL.idThread);
		left[tdL.idThread] = 1;
		pthread_exit(NULL);
	}
}

void play_game(void* arg)
{
	/*
	* Loads a question and its possible answers from the database, waits for answer from user and checks the answer.
	*/

	char buff1[256];
	char buff2[256];
	int i = 1;
	memset(buff1, 0, sizeof(buff1));
	memset(buff2, 0, sizeof(buff2));

	struct thData tdL;
	tdL = *((struct thData*)arg);

	sqlite3* db;
	int rc = sqlite3_open("quiz.db", &db);


	// select
	fd_set rfds;
	fd_set actfds;
	struct timeval tv;
	int retval;

	FD_ZERO(&actfds);
	FD_SET(tdL.cl, &actfds);


	while (i <= 5) {
		get_object(i, db, (struct thData*)arg);

		bcopy((char*)&actfds, (char*)&rfds, sizeof(rfds));

		tv.tv_sec = 5;
		tv.tv_usec = 0;

		retval = select(tdL.cl + 1, &rfds, NULL, NULL, &tv);

		if (retval == -1) {
			printf("[thread %d] Select error.\n", tdL.idThread);
		}

		else if (retval != 0) {
			memset(buff1, 0, sizeof(buff1));
			read(tdL.cl, buff1, sizeof(buff1));
			check_answer(i, db, (struct thData*)arg, buff1);
		}

		else {
			printf("[thread %d] I did not receive any messages within the time limit.\n", tdL.idThread);
			read(tdL.cl, buff1, sizeof(buff1));
			check_answer(i, db, (struct thData*)arg, buff1);
		}

		i++;
	}

	if (i > 5) {
		if (write(tdL.cl, "You finished the game.\n", 24) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;

		}
		game_over[tdL.idThread] = 1;
	}
	sqlite3_close(db);
}


void get_object(int n, sqlite3* db, void* arg)
{
	/*
	* Helper function that loads a question from the database and its possible answers.
	*/
	struct thData tdL;
	tdL = *((struct thData*)arg);
	int rc;
	int rc1;
	int x;
	char buff[256];
	sqlite3_stmt* res, * res1;
	char* sql_question = "SELECT question FROM questions WHERE question_number = ?";
	char* sql_answer = "SELECT answer FROM answers WHERE question_number = ?";

	rc = sqlite3_prepare_v2(db, sql_question, -1, &res, 0);
	rc1 = sqlite3_prepare_v2(db, sql_answer, -1, &res1, 0);

	sqlite3_bind_int(res, 1, n);
	sqlite3_bind_int(res1, 1, n);

	int step = sqlite3_step(res);

	memset(buff, 0, sizeof(buff));
	if (step == SQLITE_ROW) {
		strcpy(buff, sqlite3_column_text(res, 0));
		strcat(buff, "\n");
		if (write(tdL.cl, buff, sizeof(buff)) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;
		}
	}
	int i = 4;
	while (i > 0) {
		int step1 = sqlite3_step(res1);
		if (step1 == SQLITE_ROW) {
			memset(buff, 0, sizeof(buff));
			strcpy(buff, sqlite3_column_text(res1, 0));
			strcat(buff, "\n");
			if (write(tdL.cl, buff, sizeof(buff)) <= 0) {
				printf("[Thread %d]\n", tdL.idThread);
				perror("[Thread] write() error to client.\n");
				game_over[tdL.idThread] = 1;
				left[tdL.idThread] = 1;
			}
			i--;
		}
	}
}


void check_answer(int n, sqlite3* db, void* arg, char* buff1)
{
	/*
	* Helper function that checks the answer received from the client with the correct answer in the database.
	*/
	struct thData tdL;
	tdL = *((struct thData*)arg);

	char buff[256]; /* right answer */
	char punctaj[256];
	int rc;
	int j;

	memset(buff, 0, sizeof(buff));
	memset(punctaj, 0, sizeof(punctaj));

	// --------------------------------
	sqlite3_stmt* res;

	char* sql_answer = "SELECT answer_number FROM answers WHERE question_number = ? AND correct_answer = 1;";

	rc = sqlite3_prepare_v2(db, sql_answer, -1, &res, 0);

	sqlite3_bind_int(res, 1, n);

	int step = sqlite3_step(res);

	if (step == SQLITE_ROW) {
		strcpy(buff, sqlite3_column_text(res, 0));
		strcat(buff, "\n");

	}

	if (atoi(buff1) == atoi(buff)) {
		player[tdL.idThread].points = player[tdL.idThread].points + 10;
		if (write(tdL.cl, "The answer is correct! Current score: ", 39) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;

		}
		int j = snprintf(punctaj, sizeof(punctaj), "%d\n", player[tdL.idThread].points);

		if (write(tdL.cl, punctaj, sizeof(punctaj)) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;

		}
	}

	else {
		if (write(tdL.cl, "The answer is wrong. Better luck next time! Current score: ", 60) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;

		}
		int j = snprintf(punctaj, sizeof(punctaj), "%d\n", player[tdL.idThread].points);
		if (write(tdL.cl, punctaj, sizeof(punctaj)) <= 0) {
			printf("[Thread %d]\n", tdL.idThread);
			perror("[Thread] write() error to client.\n");
			game_over[tdL.idThread] = 1;
			left[tdL.idThread] = 1;
		}
	}
}