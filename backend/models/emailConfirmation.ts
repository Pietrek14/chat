import EmailConfirmation from '../interfaces/EmailConfirmation.ts';
import dbClient from "../connection/db.ts";
import emailClient from "../connection/email.ts";
import { config, nanoid } from "../deps.ts";

export default {
	resendDelay: 5 * 60 * 1000, // 5 minutes

	/**
	 * Searches for a email confirmation with the given id.
	 * @param id Id to be searched for.
	 * @returns The found email confirmation.
	 */
	getById: async (id: number) => {
		const result = await dbClient.query(
			`SELECT * FROM email_confirmation WHERE id = ?`,
			[id]
		);

		return result[0];
	},

	getByEmail: async (email: string) => {
		const result = await dbClient.query(
			`SELECT * FROM email_confirmation WHERE email = ?`,
			[email]
		);

		return result[0];
	},

	getByCode: async (code: string) => {
		const result = await dbClient.query(
			`SELECT * FROM email_confirmation WHERE code = ?`,
			[code]
		);

		return result[0];
	},

	/**
	 * Add a new email confirmation to the database.
	 * @param emailConfirmation
	 * @returns The added email confirmation's hash.
	 * @throws Error if a email confirmation already exists.
	 * @throws Error if the email confirmation data is invalid.
	 * @returns The added email confirmation's code.
	 */
	add: async ({ email, username, hash, signup_date }: EmailConfirmation) => {
		const code = nanoid(16);

		await dbClient.execute(
			`INSERT INTO email_confirmation (code, email, username, hash, signup_date, last_email) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
			[code, email, username, hash, signup_date]
		);

		return code;
	},

	deleteById(id: number) {
		return dbClient.execute(`DELETE FROM email_confirmation WHERE id = ?`, [id]);
	},

	deleteByEmail(email: string) {
		return dbClient.execute(`DELETE FROM email_confirmation WHERE email = ?`, [email]);
	},

	getLink(code: string) {
		return `${config().FRONTEND}/confirm?code=${code}`;
	},

	sendMail: async(receiverEmail: string, code: string) => {
		const link = `${config().FRONTEND}/confirm/?code=${code}`;

		const emailBody = (await Deno.readTextFile("static/email/registerConfirmation.html")).replace("{{link}}", link);

		emailClient.send({
			from: config().EMAIL_USER,
			to: receiverEmail,
			subject: "Confirm your email",
			html: emailBody,
		});

		// update the last email date
		await dbClient.execute(
			`UPDATE email_confirmation SET last_email = CURRENT_TIMESTAMP WHERE email = ?`,
			[receiverEmail]
		);
	},
};