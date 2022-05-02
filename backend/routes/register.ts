import { Router, bcrypt, config } from "../deps.ts";
import User from "../models/user.ts";
import EmailConfirmation from "../models/emailConfirmation.ts";

const registerRouter = new Router();

registerRouter.post("/register", async (ctx: any) => {
	const { email, username, password } = await ctx.request.body().value;

	if (!email || !username || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body. I need { email, username, password }." };
		return;
	}

	if(password.length < 8) {
		ctx.response.status = 406;
		ctx.response.body = { message: "Password must be at least 8 characters long." };
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

	await EmailConfirmation.sendMail(email, code);

	ctx.response.body = {
		message: "Waiting for email confirmation",
	};
});

export default registerRouter;