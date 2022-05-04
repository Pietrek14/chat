USE `chat`;

CREATE TABLE friendship (
	user1 INT NOT NULL,
	user2 INT NOT NULL,
	creation_date DATETIME NOT NULL,
	lesser_user INT GENERATED ALWAYS AS (CASE WHEN user1 < user2 THEN user1 ELSE user2 END),
	greater_user INT GENERATED ALWAYS AS (CASE WHEN user1 < user2 THEN user2 ELSE user1 END),
	PRIMARY KEY (user1, user2),
	FOREIGN KEY (user1) REFERENCES user(id),
	FOREIGN KEY (user2) REFERENCES user(id),
	CONSTRAINT CK_friendship_self CHECK (user1 <> user2),
	CONSTRAINT UQ_friendship_users_ordered UNIQUE (lesser_user, greater_user)
);