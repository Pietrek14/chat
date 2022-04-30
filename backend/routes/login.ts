import { Router } from "../deps.ts";
import User from "../models/user.ts";
import Session from "../models/session.ts";

const loginRouter = new Router();

loginRouter.post("/login", async (ctx: any) => {
	const { email, password } = await ctx.request.body().value;

	if (!email || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body" };
		return;
	}

	const user = await User.getByEmail(email);

	if (!user) {
		ctx.response.status = 404;
		ctx.response.body = { message: "User not found" };
		return;
	}

	// const hash = await User.hashPassword(password, user.salt);

	// if (hash !== user.hash) {
		console.log("no");
		// ctx.response.status = 401;
		// ctx.response.body = { message: "Invalid password" };
		// return;
	// }

	// Register a session
	const session = await Session.add({
		user_id: user.id,
		expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
	});

	ctx.response.body = {
		message: "Login successful",
		user: {
			id: user.id,
			email: user.email,
			username: user.username,
			signup_date: user.signup_date,
		},
		session: session
	};
});

export default loginRouter;
