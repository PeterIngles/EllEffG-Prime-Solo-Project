
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_groups" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"(id),
    "group_id" INTEGER REFERENCES "groups"(id)
);


CREATE TABLE "groups" (
    "id" SERIAL PRIMARY KEY,
    "group_name" VARCHAR(100) NOT NULL,
    "game_id" INTEGER REFERENCES "games"(id)
);

CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(50) NOT NULL,
    "icon" VARCHAR(500) NOT NULL,
    "reset" TIME
);

CREATE TABLE "activity" (
	"id" SERIAL PRIMARY KEY,
	"activity_name" varchar(100) NOT NULL,
	"player_req" INT NOT NULL,
	"date" DATE NOT NULL,
	"game_id" INT REFERENCES "games"(id)
);

CREATE TABLE "activity_responses" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user"(id),
	"activity_id" INT REFERENCES "activity"(id)
);













-----------------------
-- FAKE DATA
INSERT INTO "user" (username, password) 
VALUES ('user1', 'password1'), 
       ('user2', 'password2'), 
       ('user3', 'password3');

INSERT INTO "games" (title, icon, reset) 
VALUES ('Game1', 'icon1', '00:00:00'), 
       ('Game2', 'icon2', '01:00:00'), 
       ('Game3', 'icon3', '02:00:00');

INSERT INTO "groups" (group_name, game_id) 
VALUES ('Group1', 1), 
       ('Group2', 2), 
       ('Group3', 3);

INSERT INTO "user_groups" (user_id, group_id) 
VALUES (1, 1), 
       (2, 2), 
       (3, 3);

INSERT INTO "activity" (activity_name, player_req, date, game_id) 
VALUES ('Activity1', 2, '2023-01-01', 1), 
       ('Activity2', 3, '2023-02-01', 2), 
       ('Activity3', 4, '2023-03-01', 3);

INSERT INTO "activity_responses" (user_id, activity_id) 
VALUES (1, 1), 
       (2, 2), 
       (3, 3);
