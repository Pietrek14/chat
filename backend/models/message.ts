import dbClient from "../connection/db.ts";
import Message from "../interfaces/Message.ts";

export default {
	getById: async (id: number) => {
		const result = await dbClient.query(`SELECT * FROM message WHERE id = ?`, [
			id,
		]);

		return result[0];
	},

	getConversation: async (
		user1: number,
		user2: number,
		messageNum = 20,
		offset = 0
	) => {
		const result = await dbClient.query(
			`SELECT m.id AS id, m.content AS content, m.date AS date, m.reply AS reply, u.username AS author
				FROM message m
				INNER JOIN user u
					ON u.id = m.author
				WHERE (m.author = ? AND m.recipent = ?) OR (m.author = ? AND m.recipent = ?)
				ORDER BY m.date DESC
				LIMIT ?, ?;`,
			[user1, user2, user2, user1, offset, messageNum]
		);

		return result;
	},

	create: async ({ content, author, recipent, reply }: Message) => {
		const result = await dbClient.execute(
			`INSERT INTO message ( content, author, recipent, date, reply ) VALUES (?, ?, ?, ?, ?)`,
			[content, author, recipent, new Date(), reply]
		);

		return result;
	},
};
