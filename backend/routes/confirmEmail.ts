import { Router } from "../deps.ts";
import User from "../models/user.ts";
import EmailConfirmation from "../models/emailConfirmation.ts";

const confirmEmailRouter = new Router();

confirmEmailRouter.post("/confirmEmail", async (ctx) => {
	const { code } = await ctx.request.body().value;

	if (!code) {
		ctx.response.status = 400;
		ctx.response.body = {
			message: "Invalid request body. I need { code }.",
		};
		return;
	}

	const emailConfirmation = await EmailConfirmation.getByCode(code);

	if (!emailConfirmation) {
		ctx.response.status = 404;
		ctx.response.body = { message: "Email confirmation not found" };
		return;
	}

	const user = await User.getById(emailConfirmation.user_id);

	if (user) {
		ctx.response.status = 409;
		ctx.response.body = { message: "User already exists" };
		return;
	}

	await EmailConfirmation.confirm(code);

	ctx.response.body = {
		message: "Email confirmation successful",
	};
});

export default confirmEmailRouter;
