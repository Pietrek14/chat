import FriendRequest from "../interfaces/FriendRequest.ts";
import dbClient from "../connection/db.ts";
import emailClient from "../connection/email.ts";
import { config, nanoid } from "../deps.ts";


export default {

	checkIfFriendAlreadyInvitedYou:async (  requester: string, adressee: string ) => {
		const result = await dbClient.query(
			`SELECT * FROM friend_request WHERE requester = (SELECT id FROM user WHERE email = ?) AND adressee = (SELECT id FROM user WHERE email = ?)`,
			[adressee, requester]
		);

		return result[0];
	},


	add:async ( { creation_date, requester, adressee } : FriendRequest ) => {
		const code = nanoid(16);
		await dbClient.execute(
			`INSERT INTO friend_request (requester, adressee, code, creation_date) VALUES (?, ?, ?, ?)`,
			[requester, adressee, code, creation_date]
		);

		return code;
	},

	sendMail: async(receiverEmail: string, code: string, friendsName: string) => {
		const link_accept = `${config().FRONTEND}/acceptFriend/?code=${code}`;
		const link_reject = `${config().FRONTEND}/rejectFriend/?code=${code}`;

		
		const emailBody = (await Deno.readTextFile("static/email/newFrien.html"))
			.replace("{{friend_name}}", friendsName)
			.replace("{{link_accept}}", link_accept)
			.replace("{{link_reject}}", link_reject);

		emailClient.send({
			from: config().EMAIL_USER,
			to: receiverEmail,
			subject: "Wild frien appeared!",
			html: emailBody,
		});
	},

	checkIfCodeBelongsToAdressee:async (  adressee: number, code: string ) => {
		const result = await dbClient.query(
			`SELECT * FROM friend_request WHERE adressee = ? AND code = ?`,
			[adressee, code]
		);

		// i fucking love javascript
		// i cant believe this is valid code
		return !!result[0];
	},

	deleteFriendReqeust:async (  adressee: number, code: string ) => {
		const result = await dbClient.execute(
			`DELETE FROM friend_request WHERE adressee = ? AND code = ?`,
			[adressee, code]
		);
		 
		return result;
	},


	
}