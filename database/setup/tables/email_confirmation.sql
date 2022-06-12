USE `chat`;

CREATE TABLE IF NOT EXISTS email_confirmation (
	id INT NOT NULL AUTO_INCREMENT,
	code CHAR(16) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(255) NOT NULL,
	hash CHAR(60) NOT NULL,
	signup_date DATETIME NOT NULL,
	last_email TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
);

DELIMITER &&

CREATE PROCEDURE confirm_user(IN _code CHAR(16))
BEGIN
	SELECT email, username, hash, signup_date INTO @email, @username, @hash, @signup_date FROM email_confirmation WHERE code = _code;

	INSERT INTO user (email, username, hash, signup_date) VALUES (
		@email,
		@username,
		@hash,
		@signup_date
	);

	DELETE FROM email_confirmation WHERE code = _code;
END &&

DELIMITER ;