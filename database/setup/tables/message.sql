USE `chat`;

CREATE TABLE IF NOT EXISTS message (
	id INT NOT NULL AUTO_INCREMENT,
	content VARCHAR(255) NOT NULL,
	author INT NOT NULL,
	recipent INT NOT NULL,
	date DATETIME NOT NULL,
	reply INT,
	PRIMARY KEY(id),
	FOREIGN KEY (author) REFERENCES user(id),
	FOREIGN KEY (recipent) REFERENCES user(id),
	FOREIGN KEY (reply) REFERENCES message(id)
);