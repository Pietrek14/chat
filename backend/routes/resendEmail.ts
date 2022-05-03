import EmailConfirmation from "../models/emailConfirmation.ts";
import { Router } from "../deps.ts";

const resendEmailRouter = new Router();

resendEmailRouter.post("/resendEmail", async (ctx: any) => {
	const { email } = await ctx.request.body().value;

	if (!email) {
		ctx.response.status = 400;
		ctx.response.body = {
			message: "Invalid request body. I need { email }.",
		};
		return;
	}

	const emailConfirmation = await EmailConfirmation.getByEmail(email);

	if (!emailConfirmation) {
		ctx.response.status = 404;
		ctx.response.body = { message: "Email confirmation not found" };
		return;
	}

	console.log(emailConfirmation.last_email.getTime());
	console.log(new Date().getTime());

	const delay = emailConfirmation.last_email.getTime() + EmailConfirmation.resendDelay - new Date().getTime();

	console.log(delay);

	if(delay > 0) {
		ctx.response.status = 409;
		ctx.response.body = {
			message: "You have to wait 5 minutes before sending another email",
			timeLeft: delay / 1000,
		};
		return;
	}

	EmailConfirmation.sendMail(email, emailConfirmation.code);

	ctx.response.body = {
		message: "Email resend",
	};
});

export default resendEmailRouter;
