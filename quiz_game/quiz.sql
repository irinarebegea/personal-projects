DROP TABLE questions
/

DROP TABLE answers
/

BEGIN TRANSACTION;

CREATE TABLE questions(
    question_number INTEGER NOT NULL PRIMARY KEY,
    question VARCHAR2(100) NOT NULL
);

CREATE TABLE answers(
    question_number INTEGER NOT NULL,
    answer VARCHAR2(20),
    correct_answer INTEGER NOT NULL,
    answer_number INTEGER NOT NULL

);

-- popularea tabelului questions
INSERT INTO questions VALUES(1, 'I) In which continent is the country Japan located?');
INSERT INTO questions VALUES(2, 'II) Which one cannot swim?');
INSERT INTO questions VALUES(3, 'III) How many points are on a hexagon?');
INSERT INTO questions VALUES(4, 'IV) What is 2x(3x10+10)?');
INSERT INTO questions VALUES(5, 'V) Which color has the longest name?');


-- popularea tabelului answers
INSERT INTO answers VALUES(1, '1. Asia', 1, 1);
INSERT INTO answers VALUES(1, '2. Europe', 0, 2);
INSERT INTO answers VALUES(1, '3. Africa', 0, 3);
INSERT INTO answers VALUES(1, '4. America', 0, 4);

INSERT INTO answers VALUES(2, '1. Tuna', 0, 1);
INSERT INTO answers VALUES(2, '2. Cow', 1, 2);
INSERT INTO answers VALUES(2, '3. Whale', 0, 3);
INSERT INTO answers VALUES(2, '4. Lobster', 0, 4);

INSERT INTO answers VALUES(3, '1. 5', 0, 1);
INSERT INTO answers VALUES(3, '2. 6', 1, 2);
INSERT INTO answers VALUES(3, '3. 7', 0, 3);
INSERT INTO answers VALUES(3, '4. 8', 0, 4);

INSERT INTO answers VALUES(4, '1. 60', 0, 1);
INSERT INTO answers VALUES(4, '2. 30', 0, 2);
INSERT INTO answers VALUES(4, '3. 50', 0, 3);
INSERT INTO answers VALUES(4, '4. 80', 1, 4);

INSERT INTO answers VALUES(5, '1. Red', 0, 1);
INSERT INTO answers VALUES(5, '2. Yellow', 0, 2);
INSERT INTO answers VALUES(5, '3. Magenta', 1, 3);
INSERT INTO answers VALUES(5, '4. Blue', 0, 4);


COMMIT;