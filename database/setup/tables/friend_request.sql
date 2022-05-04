USE `chat`;

CREATE TABLE friend_request (
	requester INT NOT NULL,
	adressee INT NOT NULL,
	creation_date DATETIME NOT NULL,
	lesser_user INT GENERATED ALWAYS AS (CASE WHEN requester < adressee THEN requester ELSE adressee END),
	greater_user INT GENERATED ALWAYS AS (CASE WHEN requester < adressee THEN adressee ELSE requester END),
	PRIMARY KEY (requester, adressee),
	FOREIGN KEY (requester) REFERENCES user(id),
	FOREIGN KEY (adressee) REFERENCES user(id),
	CONSTRAINT CK_friendship_self CHECK (requester <> adressee),
	CONSTRAINT UQ_friendship_users_ordered UNIQUE (lesser_user, greater_user)
);