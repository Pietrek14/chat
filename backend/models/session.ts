import Session from "../interfaces/Session.ts";
import { nanoid } from "../deps.ts";
import dbClient from "../connection/db.ts";

export default {
	/**
	 * Searches for a session with the given id.
	 * @param id Id to be searched for.
	 * @returns The found session.
	 */
	getById: async (id: number) => {
		const result = await dbClient.query(
			`SELECT * FROM session WHERE id = ?`,
			[id]
		);

		return result[0];
	},

	/**
	 * Searches for a session with the given hash.
	 * @param hash Hash to be searched for.
	 * @returns The found session.
	 */
	getByHash: async (hash: string) => {
		const result = await dbClient.query(
			`SELECT * FROM session WHERE hash = ?`,
			[hash]
		);

		return result[0];
	},

	/**
	 * Add a new session to the database.
	 * @param session
	 * @returns The added session's hash.
	 * @throws Error if a session already exists.
	 */
	add: async ({ user_id, expiry }: Session) => {
		let hash, session;

		do {
			hash = nanoid(16);
			session = await dbClient.query(`SELECT * FROM session WHERE hash = ?`, [hash]);
		} while(session[0]);

		await dbClient.execute(
			`INSERT INTO session (user_id, hash, expiry) VALUES (?, ?, ?)`,
			[user_id, hash, expiry]
		);

		return hash;
	},

	deleteById(id: number) {
		return dbClient.execute(`DELETE FROM session WHERE id = ?`, [id]);
	},

	deleteByHash(hash: string) {
		return dbClient.execute(`DELETE FROM session WHERE hash = ?`, [hash]);
	},

	getUserByHash: async (hash: string) => {
		const result = await dbClient.query(`SELECT u.id AS id, u.email AS email, u.username AS username, u.hash AS hash, u.signup_date AS signup_date FROM user u INNER JOIN session s ON s.user_id=u.id WHERE s.hash = ?`, [
			hash,
		]);

		return result[0];
	}
};