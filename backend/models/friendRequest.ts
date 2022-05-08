import FriendRequest from "../interfaces/FriendRequest.ts";
import dbClient from "../connection/db.ts";


export default {

	checkIfFriendAlreadyInvitedYou:async (  requester: string, adressee: string ) => {
		const result = await dbClient.query(
			`SELECT * FROM friend_request WHERE requester = (SELECT id FROM user WHERE email = ?) AND adressee = (SELECT id FROM user WHERE email = ?)`,
			[adressee, requester]
		);

		return result[0];
	},


	add:async ( { creation_date, requester, adressee } : FriendRequest ) => {
		const result = await dbClient.execute(
			`INSERT INTO friend_request (requester, adressee, creation_date) VALUES (?, ?, ?)`,
			[requester, adressee, creation_date]
		);

		return result;
	}
}