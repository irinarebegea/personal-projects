#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <netdb.h>
#include <string.h>
#include <arpa/inet.h>

extern int errno; /* error code returned by some calls */


int port; /* port used to connect to the server */

int registered_user = 0;
int started_game = 0;
int game_over = 0;

int main(int argc, char* argv[])
{
	int sd; /* socket descriptor */
	struct sockaddr_in server;	/* data structure used for establishing the connection */
	char buff[256] = { 0 };
	char buff2[256] = { 0 };
	char buff3[256] = { 0 };
	char buff4[256] = { 0 };
	int value = 0;

	/* are there enough arguments in the command line? */
	if (argc != 3) {
		printf("Syntax: %s <server_address> <port>\n", argv[0]);
		return -1;
	}

	/* establising the port */
	port = atoi(argv[2]);

	/* creating the socket */
	if ((sd = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
		perror("socket() error.\n");
		return errno;
	}

	/* populating the data structure used by the server */
	/* establishing the socket family */
	server.sin_family = AF_INET;
	/* server's IP address */
	server.sin_addr.s_addr = inet_addr(argv[1]);
	/* port for connection */
	server.sin_port = htons(port);

	/* connecting to the server */
	if (connect(sd, (struct sockaddr*)&server, sizeof(struct sockaddr)) == -1) {
		perror("[client] connect() error.\n");
		return errno;
	}

	while (1) {
		if (started_game < 2) {
			memset(buff, 0, sizeof(buff));
			memset(buff2, 0, sizeof(buff2));
			memset(buff3, 0, sizeof(buff3));

			read(sd, buff, sizeof(buff));
			write(0, buff, sizeof(buff));

			read(0, buff2, sizeof(buff2));
			write(sd, buff2, sizeof(buff2));

			read(sd, buff3, sizeof(buff3));
			write(0, buff3, sizeof(buff3));

			started_game++;
		}

		else  {
			if (game_over == 0) {
				int questions = 1;

				fd_set rfds;
				fd_set actfds;
				struct timeval tv;
				int retval;

				while (questions <= 5) {

					memset(buff, 0, sizeof(buff));
					read(sd, buff, sizeof(buff));
					write(0, buff, sizeof(buff));

					int i = 4;
					while (i > 0) {
						memset(buff, 0, sizeof(buff));
						read(sd, buff, sizeof(buff));
						write(0, buff, sizeof(buff));
						i--;
					}

					FD_ZERO(&actfds);
					FD_SET(0, &actfds);

					bcopy((char*)&actfds, (char*)&rfds, sizeof(rfds));

					tv.tv_sec = 5;
					tv.tv_usec = 0;

					retval = select(1, &rfds, NULL, NULL, &tv);
					if (retval == -1) {
						printf("[client] select() error.\n");
					}

					else if (retval > 0) {
						int j = 0;
						memset(buff2, 0, sizeof(buff2));
						int x = read(0, buff2, sizeof(buff2));
						write(sd, buff2, sizeof(buff2));
					}

					else {
						printf("[client] I did not receive any messages within the time limit.\n");
						write(sd, "k", 1);
					}

					memset(buff3, 0, sizeof(buff3));

					read(sd, buff3, sizeof(buff3));
					write(0, buff3, sizeof(buff3));

					memset(buff3, 0, sizeof(buff3));

					/* printing the score */
					read(sd, buff3, sizeof(buff3));
					write(0, buff3, sizeof(buff3));

					questions++;

				}

				if (questions > 5) {
					memset(buff, 0, sizeof(buff));
					read(sd, buff, sizeof(buff));
					write(0, buff, sizeof(buff));
					game_over = 1;
				}
			}

			if (game_over == 1) {
				memset(buff, 0, sizeof(buff));
				read(sd, buff, sizeof(buff));
				write(0, buff, sizeof(buff));

				memset(buff, 0, sizeof(buff));
				read(sd, buff, sizeof(buff));
				write(0, buff, sizeof(buff));
			}
		}
	}

	/* closing the connection */
	close(sd);
}
