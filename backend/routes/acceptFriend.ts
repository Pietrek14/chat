import { Router } from "../deps.ts";
// import  User from '../models/user.ts'
import logged from "../middleware/logged.ts";
import AuthorizedContext from "../util/authorizedContext.ts";
import FriendRequest from "../models/friendRequest.ts";
import Friendship from "../models/friendship.ts";

const acceptFriendRouter = new Router();

acceptFriendRouter.post(
	"/acceptFriend",
	logged,
	async (ctx: AuthorizedContext) => {
		const { code } = await ctx.request.body().value;

		if (!ctx.user?.id) {
			return;
		}

		if (!code) {
			ctx.response.status = 400;
			ctx.response.body = {
				message: "Invalid request body. I need { code }.",
			};
			return;
		}

		if (
			!(await FriendRequest.checkIfCodeBelongsToAdressee(
				ctx.user?.id,
				code
			))
		) {
			ctx.response.status = 403;
			ctx.response.body = { message: "Thats not your firn." };
			return;
		}

		await FriendRequest.accept(code);

		ctx.response.status = 200;
		ctx.response.body = { message: "you have a friend now" };
		return;
	}
);

export default acceptFriendRouter;
