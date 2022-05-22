import { Router } from "../deps.ts";
import logged from "../middleware/logged.ts";
import AuthorizedContext from "../util/authorizedContext.ts";
import Message from "../models/message.ts";

const router = new Router();

router.post("/readMessages", logged, async (ctx: AuthorizedContext) => {
	const { friend, count, offsetOptional } = await ctx.request.body().value;

	if (!friend || !count) {
		ctx.response.status = 400;
		ctx.response.body = {
			message: "Invalid request body. I need { friend, count, [offset] }",
		};
		return;
	}

	const offset = offsetOptional ? offsetOptional : 0;

	if (ctx.user?.id === friend) {
		ctx.response.status = 409;
		ctx.response.body = { message: "You can't read messages to yourself!" };
		return;
	}

	if (!ctx.user?.id) return;

	const messages = await Message.getConversation(
		ctx.user?.id,
		friend,
		count,
		offset
	);

	ctx.response.body = messages;
});

export default router;
