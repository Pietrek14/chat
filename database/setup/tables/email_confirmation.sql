USE `chat`;

CREATE TABLE IF NOT EXISTS email_confirmation (
	id INT NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(255) NOT NULL,
	hash CHAR(128) NOT NULL,
	salt CHAR(16) NOT NULL,
	signup_date DATETIME NOT NULL,
	PRIMARY KEY(id)
);