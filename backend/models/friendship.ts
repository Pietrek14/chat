import Friendship from "../interfaces/Friendship.ts"
import dbClient from "../connection/db.ts";
// import { config, nanoid } from "../deps.ts";



export default {
	checkIfAleardyFriend: async ( user1: string, user2: string ) => {
		const result = await dbClient.query(
			`SELECT * FROM friendship WHERE user1 = (SELECT id FROM user WHERE email = ?) AND user2 = (SELECT id FROM user WHERE email = ?) UNION SELECT * FROM friendship WHERE user2 = (SELECT id FROM user WHERE email = ?) AND user1 = (SELECT id FROM user WHERE email = ?)`,
			[user1, user2, user2, user1]
		);

		console.log(!!result);
		return !!result[0];
	},

	add:async ( code: string, creation_date:Date ) => {
		const result = await dbClient.execute(
			`INSERT INTO friendship ( user1, user2, creation_date ) VALUES ((SELECT requester FROM friend_request WHERE code = ?), (SELECT adressee FROM  friend_request WHERE code = ?), ?)`,
			[code, code, creation_date]
		);

		return result;
	},
};