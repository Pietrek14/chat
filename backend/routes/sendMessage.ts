import { Router } from "../deps.ts";
import logged from '../middleware/logged.ts';
import Message from "../models/message.ts";
import AuthorizedContext from '../util/authorizedContext.ts';

const sendMessageRouter = new Router();

sendMessageRouter.post("/sendMessage", logged, async (ctx: AuthorizedContext) => {
	const { recipent, content } = await ctx.request.body().value;

	if (!recipent || !content) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body. I need { recipent, content }" };
		return;
	}

	await Message.create({
		content: content,
		author: ctx.user?.id,
		recipent: recipent,
		reply: null,
	});

	// Send a notification to the recipent through socket.io

	ctx.response.body = {
		message: "Message sent",
	};
});

export default sendMessageRouter;
