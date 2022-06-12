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

-- Checking if the message is sent between two friends

DELIMITER &&

CREATE PROCEDURE message_validation (IN _id INT, IN author INT, IN recipent INT)
BEGIN
	SELECT COUNT(*)
		INTO @friendcount
		FROM friendship
		WHERE
			(user1=author AND user2=recipent)
			OR
			(user1=recipent AND user2=author);

	-- If the author and the recipent were given as the same.
	IF author = recipent THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'trying to set author and recipent of the message as the same person';

	-- If the author and the recipents are not friends
	ELSEIF @friendcount = 0 THEN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'trying to set author and recipent of the message which are not friends';

	END IF;
END &&

CREATE TRIGGER message_insertion_trigger
	AFTER INSERT ON message
	FOR EACH ROW
BEGIN
	CALL message_validation(NEW.id, NEW.author, NEW.recipent);
END &&

CREATE TRIGGER message_update_trigger
	AFTER UPDATE ON message
	FOR EACH ROW
BEGIN
	CALL message_validation(NEW.id, NEW.author, NEW.recipent);
END &&

DELIMITER ;