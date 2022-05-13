import User from "../interfaces/User.ts";
import { bcrypt } from "../deps.ts";
import dbClient from "../connection/db.ts";

export default {
	/**
	 * Searches for a user with the given id.
	 * @param id Id to be searched for.
	 * @returns The found user.
	 */
	getById: async (id: number) => {
		const result = await dbClient.query(
			`SELECT * FROM user WHERE id = ?`,
			[id]
		);

		return result[0];
	},
	/**
	 * Searches for a user with the given email.
	 * @param id Email to be searched for.
	 * @returns The found user.
	 */
	getByEmail: async (email: string) => {
		const result = await dbClient.query(
			`SELECT * FROM user WHERE email = ?`,
			[email]
		);

		return result[0];
	},

	getIdByEmailWithEmailConfirmation: async (email: string) => {
		const result = await dbClient.query(
			'SELECT id, "user" AS "role" FROM user WHERE email = ? UNION SELECT id, "email_confirmation" AS "role" FROM email_confirmation WHERE email = ?',
			[email, email]
		);

		return result[0];
	},

	search: async (search: string, userId: number) => {
		const result = await dbClient.query(
			`SELECT friend.email AS email, friend.name AS name
				FROM (
					SELECT user.id AS id, user.email AS email, user.username AS name
						FROM user
						WHERE LOWER(username) LIKE LOWER(?)
			
					UNION

					SELECT user.id AS id, user.email AS email, user.username AS name
						FROM user
						WHERE LOWER(email) LIKE LOWER(?)
				) friend
				LEFT JOIN friendship fs
					ON (fs.lesser_user=? AND fs.greater_user=friend.id) OR (fs.lesser_user=friend.id AND fs.greater_user=?)
				LEFT JOIN friend_request fr
					ON (fr.lesser_user=? AND fr.greater_user=friend.id) OR (fr.lesser_user=friend.id AND fr.greater_user=?)
				WHERE fs.user1 IS NULL AND fr.requester IS NULL AND friend.id != ?`,
			[`%${search}%`, `%${search}%`, userId, userId, userId, userId, userId]
		);

		return result;
	},

	/**
	 * Add a new user to the database.
	 * @param user
	 */
	add: async ({ email, username, hash, signup_date }: User) => {
		const result = await dbClient.execute(
			`INSERT INTO user (email, username, hash, signup_date) VALUES (?, ?, ?, ?)`,
			[email, username, hash, signup_date]
		);

		return result;
	},

	/**
	 * Hashes the password with a salt.
	 * @param password 
	 * @param salt 
	 * @returns The hashed password.
	 */
	hashPassword: async (password: string, salt: string) => {
		let hash;

		try {
			hash = await bcrypt.hash(password, salt);
		} catch(e) {
			console.log(e);
		}

		return hash;
	},

	/**
	 * Generates a random salt.
	 */
	generateSalt: async (): Promise<string> => {
		const salt = await bcrypt.genSalt();

		return salt;
	}
};
