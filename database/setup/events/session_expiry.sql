USE `chat`;

CREATE EVENT `session_expiry_event`
	ON SCHEDULE EVERY 1 DAY
	DO
		DELETE FROM `sessions` WHERE `expiry` < NOW();
