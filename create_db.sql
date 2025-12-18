DROP DATABASE IF EXISTS health;
CREATE DATABASE health;
USE health;

DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  workout_date DATE NOT NULL,
  workout_name VARCHAR(60) NOT NULL,
  body_part VARCHAR(30) NOT NULL,
  next_body_part VARCHAR(30),
  duration_mins INT NOT NULL,
  notes VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

