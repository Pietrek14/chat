import { Application, config } from "./deps.ts";

// MIDDLEWARE
import json from "./middleware/json.ts";
import { oakCors } from "./deps.ts";

// ROUTER
import helloRouter from "./routes/hello.ts";
import loginRouter from "./routes/login.ts";
import registerRouter from "./routes/register.ts";
import confirmEmailRouter from "./routes/confirmEmail.ts";
import resendEmailRouter from "./routes/resendEmail.ts";
import sayNameRouter from "./routes/sayName.ts";
import inviteFriendRouter from './routes/inviteFriend.ts';
import logoutRouter from "./routes/logout.ts";

const PORT = config().PORT || 3000;
const HOST = config().HOST || "127.0.0.1";

const app = new Application();

app.use(oakCors({
	origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
	credentials: true,
}));
// app.use((ctx, next) => {
// 	ctx.response.headers.set("Access-Control-Allow-Credidentals", "true");
// 	next();
// });
app.use(json);

app.use(helloRouter.routes());
app.use(loginRouter.routes());
app.use(registerRouter.routes());
app.use(confirmEmailRouter.routes());
app.use(resendEmailRouter.routes());
app.use(sayNameRouter.routes());
app.use(inviteFriendRouter.routes());
app.use(logoutRouter.routes());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
