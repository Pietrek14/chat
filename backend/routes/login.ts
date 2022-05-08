import { Router, bcrypt } from "../deps.ts";
import User from "../models/user.ts";
import Session from "../models/session.ts";

const loginRouter = new Router();

loginRouter.post("/login", async (ctx) => {
	const { email, password } = await ctx.request.body().value;

	if (!email || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: "Invalid request body. I need { email, password }" };
		return;
	}

	const user = await User.getByEmail(email);

	if (!user) {
		ctx.response.status = 404;
		ctx.response.body = { message: "User not found" };
		return;
	}

	if (!(await bcrypt.compare(password, user.hash))) {
		ctx.response.status = 401;
		ctx.response.body = { message: "Invalid password" };
		return;
	}

	// Register a session
	const session = await Session.add({
		user_id: user.id,
		expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
	});

	await ctx.cookies.set('session', session, {
		httpOnly: true,
	});

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
