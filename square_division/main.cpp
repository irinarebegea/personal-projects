#include <iostream>
#include <fstream>
#include <windows.h>
#include <mmsystem.h>
#include <winbgim.h>
#include <stdlib.h>
#define BACKGROUND BLACK
#define HEIGHT 400
#define WIDTH 400
#define LEFT (getmaxx() - HEIGHT) / 2
#define UP (getmaxy() - WIDTH) / 2
#define MAX_DIMENSION 20
using namespace std;
ifstream f;
int square_side;
int square_size = 4;
bool click_outside_square;
int piece_color[8] = {BLACK, COLOR(192,12,24), COLOR(51,44,114), COLOR(76,101,44), COLOR(219,143,21), COLOR(194,83,134), COLOR(145,210,206), COLOR(260,31,67)};
int color_index = 0;
int title = 1;
int game_board[MAX_DIMENSION][MAX_DIMENSION];
int a[MAX_DIMENSION][MAX_DIMENSION]; /* the back-end matrix */
char language[30] = "Romana";
char sound[40] = "Fara sunet";
char instr[20] = " Instructiuni ";
char settings[20] = "    Setari    ";
char game_board_title[20] = " Tabla de joc ";
char level[20] = "     Nivel    ";
char start[20] = " START ";
char Back[20] = "Inapoi";
char square_size_4[20] = " Tabla 4x4 ", square_size_6[20] = " Tabla 6x6 ", square_size_8[20] = " Tabla 8x8 ";
char lvl1[20] = "Nivelul 1", lvl2[20] = "Nivelul 2", lvl3[20] = "Nivelul 3", lvl4[20] = "Nivelul 4";
char romanian_lang[20] = "Romana  ", english_lang[20] = "Engleza ", french_lang[20] = "Franceza";
char first_song[20] = "Melodie 1", second_song[20] = "Melodie 2", no_sound[20] = "Fara sunet";
char default_shape[20] = "Cerc", first_shape[20] = "Cerc  ", second_shape[20] = "Patrat";
char check[20] = " Verificare ", BACK[20] = "   Inapoi   ";

/// functions needed for all the levels
void choose_level(int level, int game_board[MAX_DIMENSION][MAX_DIMENSION], int a[MAX_DIMENSION][MAX_DIMENSION])
{
    /*
    * Loads the level chosen by the user.
    */
    int board_size;
    char string_level[20];

    itoa(level, string_level, 10);
    strcat(string_level, ".txt");

    f.open(string_level);
    f >> board_size;

    for(int i = 1; i <= board_size; i++)
        for(int j = 1; j <= board_size; j++) {
            a[i][j] = 0;
            game_board[i][j] = 0;
        }
    for(int k = 1; k <= board_size; k++) {
        int i, j;
        f >> i >> j;
        a[i][j] = -k;
        game_board[i][j] = -k;
    }
    f.close();
}

int level_number = 1;
int piece_shape = 1; /* the default piece shape is set to circle */
void print_winning_message()
{
    /*
    * Prints the message "You won!" in either Romanian, English or French.
    */
    if(title == 1)
        readimagefile("images/win.jpg", 2, 300, 347, 150);
    else if(title == 2)
        readimagefile("images/win_E.jpg", 2, 300, 347, 150);
    else
        readimagefile("images/win_F.jpg", 2, 300, 347, 150);

}
void print_losing_message()
{
    /*
    * Prints the message "Try again!" in either Romanian, English or French.
    */
    if(title==1)
        readimagefile("images/lose.jpg", 2, 300, 347, 150);
    else if(title==2)
        readimagefile("images/lose_E.jpg", 2, 300, 347, 150);
    else
        readimagefile("images/lose_F.jpg", 2, 300, 347, 150);

}
void draw_game_piece(int line, int column, int v)
{
    /*
    * Helper function that draws a piece of a specified color.
    */
    int color_index;
    if (v < 0) color_index = -v;
    else color_index = v;
    int x1, y1, x2, y2, x_middle, y_middle;

    setcolor(BACKGROUND);
    setfillstyle(SOLID_FILL, BACKGROUND);

    x1 = LEFT + square_side * (column - 1);
    y1 = UP + square_side * (line - 1);

    x2 = x1 + square_side;
    y2 = y1 + square_side;

    x_middle = (x1 + x2) / 2;
    y_middle = (y1 + y2) / 2;

    // prints a circle of the color specified by piece_color[color_index]
    setcolor(piece_color[color_index]);
    setfillstyle(SOLID_FILL, piece_color[color_index]);
    if (v < 0)
        setcolor(WHITE);

    if (piece_shape == 1 && square_size == 4)
        fillellipse(x_middle, y_middle, 30, 30);
    else if (piece_shape == 1 && square_size == 6)
        fillellipse(x_middle, y_middle, 25, 25);
    else if (piece_shape == 1 && square_size == 8)
        fillellipse(x_middle, y_middle, 20, 20);
    else if (piece_shape == 2)
        bar(x_middle - 20, y_middle - 20, x_middle + 20, y_middle + 20);

}

void place_game_piece()
{
    /*
    * Places a piece where the user clicks, if they click inside the square.
    */
    int line, column;
    int x, y;
    if(ismouseclick(WM_LBUTTONDOWN)) {
        clearmouseclick(WM_LBUTTONDOWN);

        x = mousex();
        y = mousey();

        if (!(x >= LEFT && x <= LEFT + WIDTH && y >= UP && y <= UP + HEIGHT))
            click_outside_square = true;

        else {
            line = (y - UP) / square_side + 1;
            column = (x - LEFT) / square_side + 1;
            if (game_board[line][column] >= 0) {
                /*
                == 0 means the cell is empty,
                > 0 means the cell already contains a piece,
                which can be of a different color than the selected one
                */
                game_board[line][column] = color_index;
                a[line][column] = color_index;
                draw_game_piece(line, column, color_index);
            }

            else if (game_board[line][column] < 0) {
                /* takes the color of a piece which was on the board from the beginning */
                color_index = - game_board[line][column];
            }
        }
    }

    if(ismouseclick(WM_RBUTTONDOWN)) {
        clearmouseclick(WM_RBUTTONDOWN);
        x = mousex();
        y = mousey();
        line = (y - UP) / square_side + 1;
        column = (x - LEFT) / square_side + 1;
        if (game_board[line][column] > 0) {
            game_board[line][column] = 0;
            a[line][column] = 0;
            draw_game_piece(line, column, 0);
        }
    }
}

void draw_square(int square_size)
{
    /*
    * Draws the square and the initial pieces for each level.
    */
    square_side = WIDTH / square_size;

    for (int i = 1; i <= square_size; i++)
        for (int j = 1; j <= square_size; j++) {
            setcolor(WHITE);
            rectangle(LEFT + square_side * (i - 1),
                      UP + square_side * (j - 1),
                      LEFT + square_side * i,
                      UP + square_side * j);
            draw_game_piece(i, j, game_board[i][j]);
        }
}

int check_solution(int a[MAX_DIMENSION][MAX_DIMENSION])
{
    /*
    * Checks if the solution provided by the user is correct.
    */
    int correct = 1;
    int fr[MAX_DIMENSION] = {0};
    for(int i = 1; i <= square_size; i++)
        for(int j =1; j <= square_size; j++) {
            if(a[i][j] == 0)
                /* if there is an empty cell */
                correct = 0;

            if(a[i][j] > 0
               && a[i][j] != abs(a[i][j + 1])
               && a[i][j] != abs(a[i + 1][j])
               && a[i][j] != abs(a[i][j - 1])
               && a[i][j] != abs(a[i - 1][j]))
               /* the color of a circle must be the same as the color of its neighbors */
                correct = 0;

            fr[a[i][j]]++;
        }

    for(int i = 1; i <= square_size; i++)
        if(fr[i] != square_size - 1)
            correct = 0;

    return correct;
}

void print_language()
{
    /*
    * Prints the menu in the selected language.
    */
    if (strcmp(language,"Romana") == 0) {
        strcpy(instr, " Instructiuni ");
        strcpy(game_board_title, " Tabla de joc ");
        strcpy(level, "     Nivel    ");
        strcpy(Back, "Inapoi");
        strcpy(square_size_4, "Tabla 4x4");
        strcpy(square_size_6, "Tabla 6x6");
        strcpy(square_size_8, "Tabla 8x8");
        strcpy(lvl1, "Nivelul 1");
        strcpy(lvl2, "Nivelul 2");
        strcpy(lvl3, "Nivelul 3");
        strcpy(lvl4, "Nivelul 4");
        strcpy(settings, "    Setari    ");
        strcpy(start, " START ");
        strcpy(romanian_lang, "Romana  ");
        strcpy(english_lang, "Engleza ");
        strcpy(french_lang, "Franceza");
        strcpy(first_song, "Melodie 1");
        strcpy(second_song, "Melodie 2");
        strcpy(no_sound, "Fara sunet");
        strcpy(first_shape, "Cerc  ");
        strcpy(second_shape, "Patrat");
        strcpy(check, " Verificare ");
        strcpy(BACK, "   Inapoi   ");
    }

    else if (strcmp(language,"Engleza") == 0) {
        strcpy(instr, " Instructions ");
        strcpy(game_board_title, "  Game Board  ");
        strcpy(level, "     Level    ");
        strcpy(Back, " Back ");
        strcpy(square_size_4, " 4x4 Board ");
        strcpy(square_size_6, " 6x6 Board ");
        strcpy(square_size_8, " 8x8 Board ");
        strcpy(lvl1, " Level 1 ");
        strcpy(lvl2, " Level 2 ");
        strcpy(lvl3, " Level 3 ");
        strcpy(lvl4, " Level 4 ");
        strcpy(settings, "   Settings   ");
        strcpy(start, " START ");
        strcpy(romanian_lang, "Romanian");
        strcpy(english_lang, "English ");
        strcpy(french_lang, "French  ");
        strcpy(first_song, " Song 1 ");
        strcpy(second_song, " Song 2 ");
        strcpy(no_sound, " No sound ");
        strcpy(first_shape, "Circle");
        strcpy (second_shape, "Square");
        strcpy(check, "Verification");
        strcpy(BACK, "    Back    ");
    }

    else if (strcmp(language,"Franceza") == 0) {
        strcpy(instr, " Instructions ");
        strcpy(game_board_title, "    Planche   ");
        strcpy(level, "    Niveau    ");
        strcpy(Back, "Retour");
        strcpy(square_size_4, "4x4 Planche");
        strcpy(square_size_6, "6x6 Planche");
        strcpy(square_size_8, "8x8 Planche");
        strcpy(lvl1, " Niveau 1");
        strcpy(lvl2, " Niveau 2");
        strcpy(lvl3, " Niveau 3");
        strcpy(lvl4, " Niveau 4");
        strcpy(settings, "   Reglages   ");
        strcpy(start, "  DEBUT ");
        strcpy(romanian_lang, "Roumain ");
        strcpy(english_lang, "Anglais ");
        strcpy(french_lang, "Francais");
        strcpy(first_song, "Chanson 1");
        strcpy(second_song, "Chanson 2");
        strcpy(no_sound, "Pas de son");
        strcpy(first_shape, "Cercle");
        strcpy (second_shape, "Carre ");
        strcpy(check, "Verification");
        strcpy(BACK, "   Retour   ");
    }
}
/// menu function
int menu()
{
    int x, y;
    initwindow(1100, 650);

Division:
    setcolor(LIGHTRED);
    setbkcolor(COLOR(58, 13, 18));
    if (title == 1)
        readimagefile("images/image_R.jpg", 0, 0, 1100, 650);
    else if (title == 2)
        readimagefile("images/image_E.jpg", 0, 0, 1100, 650);
    else
        readimagefile("images/image_F.jpg", 0, 0, 1100, 650);

    settextstyle(BOLD_FONT, HORIZ_DIR, 6);
    outtextxy(310, 200, instr);
    outtextxy(310, 270, game_board_title);
    outtextxy(310, 340, level);
    outtextxy(310, 410, settings);
    outtextxy(420, 520, start);
    while (1) {
        while (!(ismouseclick(WM_LBUTTONDOWN)));
        clearmouseclick(WM_LBUTTONDOWN);
        x = mousex();
        y = mousey();
        if (x > 310 && x < 1000 && y > 200 && y < 250) {

Rules:
            cleardevice();
            if (title == 1)
                readimagefile("images/instr_R.jpg", 0, 0, 1100, 650);
            if (title == 2)
                readimagefile("images/instr_E.jpg", 0, 0, 1100, 650);
            if (title==3)
                readimagefile("images/instr_F.jpg", 0, 0, 1100, 650);
            while (!(x > 770 && x < 1100 && y > 600 && y < 640)) {
                settextstyle(BOLD_FONT, HORIZ_DIR, 4);
                setcolor(COLOR(194, 41, 61));
                setbkcolor(COLOR(58, 13, 18));
                outtextxy(770, 600, Back);
                while (!(ismouseclick(WM_LBUTTONDOWN)));
                clearmouseclick(WM_LBUTTONDOWN);
                x = mousex();
                y = mousey();
                if(x > 770 && x < 1100 && y > 600 && y < 640);
            }
            {
                cleardevice();
                goto Division;
            }
        }
        else if (x > 310 && x < 700 && y > 270 && y < 350) {

Game_board:
            cleardevice();
            if (title == 1)
                readimagefile("images/tbj_R.jpg", 0, 0, 1100, 650);
            if (title == 2)
                readimagefile("images/tbj_E.jpg", 0, 0, 1100, 650);
            if (title == 3)
                readimagefile("images/tbj_F.jpg", 0, 0, 1100, 650);
            settextstyle(BOLD_FONT, HORIZ_DIR,5);
            setbkcolor(COLOR(106, 58, 56));
            if (square_size == 4)
                setcolor(LIGHTRED);
            setcolor(LIGHTRED);
            outtextxy(420, 300, square_size_4);

            setbkcolor(COLOR(106, 58, 56));
            if (square_size == 6)
                setcolor(LIGHTRED);
            setcolor(COLOR(17, 153, 179));
            outtextxy(420, 350, square_size_6);

            setbkcolor(COLOR(106, 58, 56));
            if (square_size == 8)
                setcolor(LIGHTRED);
            setcolor(COLOR(17, 153, 179));
            outtextxy(420, 400, square_size_8);

            setbkcolor(COLOR(13, 61, 75));
            outtextxy(670, 490, Back);
            setbkcolor(COLOR(106, 58, 56));

            while (!(ismouseclick(WM_LBUTTONDOWN)));
            clearmouseclick(WM_LBUTTONDOWN);
            x = mousex();
            y = mousey();
            while (!(x > 670 && x < 800 && y > 490 && y < 550)) {
                if (x > 420 && x < 700 && y > 300 && y < 340) {
                    setcolor(LIGHTRED);
                    outtextxy(420, 300, square_size_4);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(420, 350, square_size_6);
                    outtextxy(420, 400, square_size_8);
                    square_size = 4;
                    cout << square_size << endl;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 420 && x < 700 && y > 350 && y < 390) {
                    setcolor(LIGHTRED);
                    outtextxy(420, 350, square_size_6);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(420, 300, square_size_4);
                    outtextxy(420, 400, square_size_8);
                    square_size = 6;
                    cout << square_size << endl;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 420 && x < 700 && y > 400 && y < 440) {
                    setcolor(LIGHTRED);
                    outtextxy(420, 400, square_size_8);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(420, 300, square_size_4);
                    outtextxy(420, 350, square_size_6);
                    square_size = 8;
                    cout << square_size << endl;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else {
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }
            }

            {
                setcolor(LIGHTRED);
                outtextxy(670, 490, Back);
                cleardevice();
                goto Division;
            }
        }
        else if (x > 310 && x < 1000 && y > 340 && y < 400) {

Level:
            cleardevice();
            if (title == 1)
                readimagefile("images/niv_R.jpg", 0, 0, 1100, 650);
            if (title == 2)
                readimagefile("images/niv_E.jpg", 0, 0, 1100, 650);
            if (title == 3)
                readimagefile("images/niv_F.jpg", 0, 0, 1100, 650);
            if (x > 450 && x < 540 && y > 500 && y < 630);
            settextstyle(BOLD_FONT, HORIZ_DIR, 5);
            setbkcolor(COLOR(106, 58, 56));
            if (level_number == 1)
                setcolor(LIGHTRED);
            setcolor(LIGHTRED);
            outtextxy(440, 250, lvl1);

            setbkcolor(COLOR(106, 58, 56));
            if (level_number == 2)
                setcolor(LIGHTRED);
            setcolor(COLOR(17, 153, 179));
            outtextxy(440, 300, lvl2);

            setbkcolor(COLOR(106, 58, 56));
            if (level_number == 3)
                setcolor(LIGHTRED);
            setcolor(COLOR(17, 153, 179));
            outtextxy(440, 350, lvl3);

            setbkcolor(COLOR(106, 58, 56));
            if (level_number == 4)
                setcolor(LIGHTRED);
            setcolor(COLOR(17, 153, 179));
            outtextxy(440, 400, lvl4);

            setbkcolor(COLOR(13, 61, 75));
            outtextxy(670, 490, Back);
            setbkcolor(COLOR(106, 58, 56));

            while (!(ismouseclick(WM_LBUTTONDOWN)));
            clearmouseclick(WM_LBUTTONDOWN);
            x = mousex();
            y = mousey();
            while (!(x > 670 && x < 800 && y > 490 && y < 550)) {
                if (x>440&&x<730&&y>250&&y<290) {
                    setcolor(LIGHTRED);
                    outtextxy(440, 250, lvl1);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(440, 300, lvl2);
                    outtextxy(440, 350, lvl3);
                    outtextxy(440, 400, lvl4);
                    level_number = 1;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 440 && x < 730 && y > 300 && y < 340) {
                    setcolor(LIGHTRED);
                    outtextxy(440, 300, lvl2);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(440, 250, lvl1);
                    outtextxy(440, 350, lvl3);
                    outtextxy(440, 400, lvl4);
                    level_number = 2;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 440 && x < 730 && y > 350 && y < 390) {
                    setcolor(LIGHTRED);
                    outtextxy(440, 350, lvl3);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(440, 250, lvl1);
                    outtextxy(440, 300, lvl2);
                    outtextxy(440, 400, lvl4);
                    level_number = 3;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 440 && x < 730 && y > 400 && y < 440) {
                    setcolor(LIGHTRED);
                    outtextxy(440, 400, lvl4);
                    setcolor(COLOR(17, 153, 179));
                    outtextxy(440, 250, lvl1);
                    outtextxy(440, 300, lvl2);
                    outtextxy(440, 350, lvl3);
                    level_number = 4;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else {
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }
            }
            {
                cleardevice();
                goto Division;
            }
        }

        else if (x > 310 && x < 1100 && y > 410 && y < 450) {

Settings:
            cleardevice();
            if (title == 1)
                readimagefile("images/set.jpg", 0, 0, 1100, 650);
            if (title == 2)
                readimagefile("images/set_E.jpg", 0, 0, 1100, 650);
            if (title == 3)
                readimagefile("images/set_F.jpg", 0, 0, 1100, 650);
            setcolor(COLOR(58, 13, 18));
            setbkcolor(COLOR(237, 120, 103));

            settextstyle(BOLD_FONT, HORIZ_DIR, 5);
            if (strcmp(language, "Romana") == 0) {
                setcolor(COLOR(237, 120, 103));
                setbkcolor(COLOR(58, 13, 18));
            }
            outtextxy(75, 250, romanian_lang);
            setcolor(COLOR(58, 13, 18));
            setbkcolor(COLOR(237, 120, 103));

            if (strcmp(language, "Engleza") == 0) {
                setcolor(COLOR(237, 120, 103));
                setbkcolor(COLOR(58, 13, 18));
            }
            outtextxy(75, 300, english_lang);
            setcolor(COLOR(58, 13, 18));
            setbkcolor(COLOR(237, 120, 103));

            if (strcmp(language, "Franceza") == 0) {
                setcolor(COLOR(237, 120, 103));
                setbkcolor(COLOR(58, 13, 18));
            }
            outtextxy(75, 350, french_lang);
            setcolor(COLOR(58, 13, 18));
            setbkcolor(COLOR(237, 120, 103));

            ///---------------------------------

            settextstyle(BOLD_FONT, HORIZ_DIR, 5);
            setcolor(COLOR(0, 24, 84));
            setbkcolor(COLOR(17, 153, 179));


            if (strcmp(sound, "Fara sunet") == 0) {
                setcolor(COLOR(17, 153, 179));
                setbkcolor(COLOR(0, 24, 84));
            }
            outtextxy(410, 450, no_sound);
            setcolor(COLOR(0, 24, 84));
            setbkcolor(COLOR(17, 153, 179));
            if (strcmp(sound, "Melodie 1") == 0) {
                setcolor(COLOR(17, 153, 179));
                setbkcolor(COLOR(0, 24, 84));
            }
            outtextxy(423, 500, first_song);
            setcolor(COLOR(0, 24, 84));
            setbkcolor(COLOR(17, 153, 179));

            if (strcmp(sound, "Melodie 2") == 0) {
                setcolor(COLOR(17, 153, 179));
                setbkcolor(COLOR(0, 24, 84));
            }
            outtextxy(423, 550, second_song);
            setcolor(COLOR(0, 24, 84));
            setbkcolor(COLOR(17, 153, 179));

            ///------------------------------

            settextstyle(BOLD_FONT, HORIZ_DIR, 5);
            setcolor(COLOR(17, 153, 179));
            setbkcolor(COLOR(0, 24, 84));

            if (strcmp(default_shape, "Cerc") == 0)
            {
                setcolor(COLOR(0, 24, 84));
                setbkcolor(COLOR(17, 153, 179));
            }
            outtextxy(810,250, first_shape);
            setcolor(COLOR(17, 153, 179));
            setbkcolor(COLOR(0, 24, 84));

            if(strcmp(default_shape, "Patrat") == 0) {
                setcolor(COLOR(0, 24, 84));
                setbkcolor(COLOR(17, 153, 179));

            }
            outtextxy(810, 300, second_shape);
            setcolor(COLOR(17, 153, 179));
            setbkcolor(COLOR(0, 24, 84));

            setcolor(COLOR(237, 120, 103));
            setbkcolor(COLOR(58, 13, 18));
            outtextxy(820, 600, Back);

            while (!(ismouseclick(WM_LBUTTONDOWN)));
            clearmouseclick(WM_LBUTTONDOWN);
            x = mousex();
            y = mousey();

            while (!(x > 850 && x < 1100 && y > 600 && y < 640)) {
                if (x > 75 && x < 280 && y > 250 && y < 280) {
                    setcolor(COLOR(237, 120, 103));
                    setbkcolor(COLOR(58, 13, 18));
                    outtextxy(75, 250, romanian_lang);
                    setcolor(COLOR(58, 13, 18));
                    setbkcolor(COLOR(237, 120, 103));
                    outtextxy(75, 300, english_lang);
                    outtextxy(75, 350, french_lang);
                    strcpy(language, "Romana");
                    print_language();
                    title = 1;
                    goto Settings;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 75 && x < 280 && y > 300 && y < 330) {
                    setcolor(COLOR(237, 120, 103));
                    setbkcolor(COLOR(58, 13, 18));
                    outtextxy(75, 250, english_lang);
                    setcolor(COLOR(58, 13, 18));
                    setbkcolor(COLOR(237, 120, 103));
                    outtextxy(75, 300, romanian_lang);
                    outtextxy(75, 350, french_lang);
                    strcpy(language, "Engleza");
                    print_language();
                    title = 2;
                    goto Settings;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 75 && x < 280 && y > 350 && y < 380) {
                    setcolor(COLOR(237, 120, 103));
                    setbkcolor(COLOR(58, 13, 18));
                    outtextxy(75, 350, french_lang);
                    setcolor(COLOR(58, 13, 18));
                    setbkcolor(COLOR(237, 120, 103));
                    outtextxy(75, 300, romanian_lang);
                    outtextxy(75, 250, english_lang);
                    strcpy(language, "Franceza");
                    print_language();
                    title = 3;
                    goto Settings;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                /// Music

                else if (x > 410 && x < 630 && y > 450 && y < 480) {
                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(410, 450, no_sound);
                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));
                    outtextxy(423, 550, second_song);
                    outtextxy(423, 500, first_song);

                    strcpy(sound, "Fara sunet");
                    PlaySound(NULL, 0, 0);
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }
                else if (x > 423 && x < 640 && y > 500 && y < 530) {
                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(423, 500, first_song);
                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));
                    outtextxy(423, 550, second_song);
                    outtextxy(410, 450, no_sound);
                    strcpy(sound, "Melodie 1");
                    PlaySound(TEXT("sounds/zelda.wav"), NULL, SND_ASYNC);
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 423 && x < 640 && y > 550 && y < 580) {
                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(423, 550, second_song);
                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));
                    outtextxy(423, 500, first_song);
                    outtextxy(410, 450, no_sound);

                    strcpy(sound, "Melodie 2");
                    PlaySound(TEXT("sounds/sonne.wav"), NULL, SND_ASYNC);
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();

                }

                else if (x > 410 && x < 630 && y > 450 && y < 480) {
                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(410, 450, no_sound);
                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));
                    outtextxy(423, 550, second_song);
                    outtextxy(423, 500, first_song);

                    strcpy(sound, "Fara sunet");
                    PlaySound(NULL, 0, 0);
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();

                }
                /// Songs
                else if (x > 810 && x < 1000 && y > 250 && y < 280) {

                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));

                    outtextxy(810, 250, first_shape);
                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(810, 300, second_shape);
                    strcpy(default_shape, "Cerc");
                    piece_shape = 1;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

                else if (x > 810 && x < 1000 && y > 300 && y < 330) {

                    setcolor(COLOR(0, 24, 84));
                    setbkcolor(COLOR(17, 153, 179));

                    outtextxy(810, 300, second_shape);

                    setcolor(COLOR(17, 153, 179));
                    setbkcolor(COLOR(0, 24, 84));
                    outtextxy(810, 250, first_shape);

                    strcpy(default_shape, "Patrat");
                    piece_shape = 2;
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }


                else {
                    while (!(ismouseclick(WM_LBUTTONDOWN)));
                    clearmouseclick(WM_LBUTTONDOWN);
                    x = mousex();
                    y = mousey();
                }

            }
            {
                cleardevice();
                goto Division;
            }


        }

        else if (x > 365 && x < 1100 && y > 520 && y < 560) {

Start:

            cleardevice();
            if (square_size == 4) {
                if (level_number == 1)
                    choose_level(41, game_board, a);
                else if (level_number == 2)
                    choose_level(42, game_board, a);
                else if (level_number == 3)
                    choose_level(43, game_board, a);
                else if (level_number == 4)
                    choose_level(44, game_board, a);
            }

            else if (square_size == 6) {
                if(level_number == 1)
                    choose_level(61, game_board, a);
                else if (level_number == 2)
                    choose_level(62, game_board, a);
                else if (level_number == 3)
                    choose_level(63, game_board, a);
                else if (level_number == 4)
                    choose_level(64, game_board, a);
            }

            else if (square_size == 8) {
                if (level_number == 1)
                    choose_level(81, game_board, a);
                else if (level_number == 2)
                    choose_level(82, game_board, a);
                else if (level_number == 3)
                    choose_level(83, game_board, a);
                else if (level_number == 4)
                    choose_level(84, game_board, a);
            }
            readimagefile("images/tablanoua.jpg", 0, 0, 1100, 650);
            draw_square(square_size);
            setcolor(WHITE);
            settextstyle(BOLD_FONT, HORIZ_DIR, 5);
            setbkcolor(COLOR(176, 0, 0));
            outtextxy(770, 250, check);
            place_game_piece();
            outtextxy(770, 300, BACK);

            click_outside_square = false;
            do {
                place_game_piece();
            } while (!click_outside_square);
            do {
                while (!(ismouseclick(WM_LBUTTONDOWN)));
                clearmouseclick(WM_LBUTTONDOWN);
                x = mousex();
                y = mousey();

                if (x > 770 && x < 1100 && y > 250 && y < 350) {
                    if(check_solution(a) == 1)
                        print_winning_message();
                    else
                        print_losing_message();
                }
            }
            while (!(x > 770 && x < 1100 && y > 300 && y < 400));

            if (x > 770 && x < 1100 && y > 300 && y < 400);
            cleardevice();
            goto Division;
        }

        getch();
        closegraph();
    }

}

int main()
{
    menu();
    getch();
    closegraph();

    return 0;
}
