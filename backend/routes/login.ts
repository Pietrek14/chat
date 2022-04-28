import { Router } from "../deps.ts";
import User from "../models/user.ts";

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

	const hash = await User.hashPassword(password, user.salt);

	if (hash !== user.hash) {
		ctx.response.status = 401;
		ctx.response.body = { message: "Invalid password" };
		return;
	}

	// Register a session

	ctx.response.body = {
		message: "Login successful",
		user: {
			id: user.id,
			email: user.email,
			username: user.username,
			signup_date: user.signup_date,
		},
	};
});

export default loginRouter;
