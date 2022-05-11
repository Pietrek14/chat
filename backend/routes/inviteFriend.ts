import { Router } from '../deps.ts';
import  User from '../models/user.ts'
import FriendRequest from '../models/friendRequest.ts';
import Friendship from '../models/friendship.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';


const inviteFriendRouter = new Router();

inviteFriendRouter.post("/inviteFriend", logged ,async (ctx: AuthorizedContext) => {
	const { friendsEmail } = await ctx.request.body().value;''


	if (!friendsEmail) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body. I need { friendsEmail }." };
		return;
	}

	console.log(ctx.user?.id); 
	console.log(ctx.user?.email); 
	console.log("=======================");
	console.log((await User.getByEmail(friendsEmail)).id);
	console.log(friendsEmail);
	
	if (!ctx.user?.email || !ctx.user?.username) {
		return;
	}

	if (!await User.getByEmail(friendsEmail)) {
		ctx.response.status = 410;
		ctx.response.body = { message: `User with email ${friendsEmail} not found. Friend gone?`};
		return;
	}

	if(friendsEmail == ctx.user?.email) {
		ctx.response.status = 406;
		ctx.response.body = { message: "You want to be your own friend? Damn, you must be lonely..."};
		return;
	}

	console.log("here");
	if(await Friendship.checkIfAleardyFriend(ctx.user?.email, friendsEmail)) {
		ctx.response.status = 409;
		ctx.response.body = { message: "This is your friend already. Dont worry :)"};
		return;
	}
	console.log("here");

	if(await FriendRequest.checkIfFriendAlreadyInvitedYou(ctx.user?.email, friendsEmail)) {
		ctx.response.status = 200;
		ctx.response.body = { message: "Friend Already invited you!!!"};
		return;
	}
	

	const code = await FriendRequest.add({
		requester: ctx.user?.id,
		adressee: (await User.getByEmail(friendsEmail)).id,
		creation_date: new Date()
	});

// TODO: add code to email bc now its kinda useless
		FriendRequest.sendMail(friendsEmail, code, ctx.user?.username);


	ctx.response.status = 200;
	ctx.response.body = { message: "You found a frien :)"};
	// i think the friend request should show up somewhere in UI and there should be email send

});


export default inviteFriendRouter;