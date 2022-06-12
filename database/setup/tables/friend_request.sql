USE `chat`;

CREATE TABLE friend_request (
	requester INT NOT NULL,
	adressee INT NOT NULL,
	code CHAR(16) NOT NULL UNIQUE,
	creation_date DATETIME NOT NULL,
	lesser_user INT GENERATED ALWAYS AS (CASE WHEN requester < adressee THEN requester ELSE adressee END),
	greater_user INT GENERATED ALWAYS AS (CASE WHEN requester < adressee THEN adressee ELSE requester END),
	PRIMARY KEY (requester, adressee),
	FOREIGN KEY (requester) REFERENCES user(id),
	FOREIGN KEY (adressee) REFERENCES user(id),
	CONSTRAINT CK_friend_request_self CHECK (requester <> adressee),
	CONSTRAINT UQ_friend_request_users_ordered UNIQUE (lesser_user, greater_user)
);

DELIMITER &&

CREATE PROCEDURE accept_invite(IN _code CHAR(16))
BEGIN
	SELECT requester, adressee INTO @requester, @adressee FROM friend_request WHERE code = _code;

	INSERT INTO friendship ( user1, user2, creation_date ) VALUES
	(
		@requester,
		@adressee,
		NOW()
	);

	DELETE FROM friend_request WHERE code = _code;
END &&

CREATE PROCEDURE reject_invite(IN _code CHAR(16))
BEGIN
	DELETE FROM friend_request WHERE code = _code;
END &&

DELIMITER ;