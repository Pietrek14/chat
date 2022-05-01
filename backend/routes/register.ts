import { Router, bcrypt, config } from "../deps.ts";
import User from "../models/user.ts";
import EmailConfirmation from "../models/emailConfirmation.ts";
import emailClient from "../connection/email.ts";

const registerRouter = new Router();

registerRouter.post("/register", async (ctx: any) => {
	const { email, username, password } = await ctx.request.body().value;

	if (!email || !username || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body. I need { email, username, password }." };
		return;
	}

	const user = await User.getIdByEmailWithEmailConfirmation(email);

	if (user) {
		ctx.response.status = 409;
		// substatus is zero if there is a confirmed user of given email, 1 if there is a pending user of given email
		ctx.response.body = { message: "User already exists", substatus: user.role == "user" ? 0 : 1 };
		return;
	}

	const hash = await bcrypt.hash(password);

	const code = await EmailConfirmation.add({
		email: email,
		username: username,
		hash: hash,
		signup_date: new Date(),
	});

	const link = EmailConfirmation.getLink(code);

	const emailBody = (await Deno.readTextFile("static/email/registerConfirmation.html")).replace("{{link}}", link);

	emailClient.send({
		from: config().EMAIL_USER,
		to: email,
		subject: "Confirm your email",
		html: emailBody,
	});

	ctx.response.body = {
		message: "Waiting for email confirmation",
	};
});

export default registerRouter;