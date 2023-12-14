DROP DATABASE IF EXISTS AskAllDB;
CREATE DATABASE AskAllDB;
USE AskAllDB;
SET GLOBAL event_scheduler = ON;

CREATE TABLE user(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(50) NULL,
    passwordd VARCHAR(250) NULL,
    accountDateCreated VARCHAR(100),
    inArchive VARCHAR(15) DEFAULT 'false',
    notif VARCHAR(50) DEFAULT ""
);
ALTER TABLE user AUTO_INCREMENT = 100;

CREATE EVENT update_every_5_seconds
ON SCHEDULE EVERY 5 SECOND
DO UPDATE user SET notif = "";

CREATE TABLE archive(
    ID INT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(50) NULL,
    accountDateCreated VARCHAR(100)
);

CREATE TABLE auditTrail(
    ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userID INT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    otp VARCHAR(25),
    login TIMESTAMP,
    logout TIMESTAMP
);

CREATE TABLE admin (
  admin_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email_address VARCHAR(45) NOT NULL,
  phone_number VARCHAR(45) NOT NULL,
  password VARCHAR(250) NOT NULL
);

CREATE TABLE sessionn(
    ID VARCHAR(250)
);

CREATE TABLE admin_session(
    ID VARCHAR(250)
);

INSERT INTO sessionn (ID) VALUES (0);
INSERT INTO admin_session (ID) VALUES (0);

CREATE TABLE askalldb.todo_list (
  todo_ID INT NOT NULL AUTO_INCREMENT,
  user_ID INT NULL,
  items VARCHAR(60) NULL,
  PRIMARY KEY (todo_ID));

INSERT INTO admin(first_name, last_name, email_address, phone_number, password) 
VALUES ("Ask", "All", "askall.web@gmail.com", "09086050160", MD5('123'));