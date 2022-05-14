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
import inviteFriendRouter from "./routes/inviteFriend.ts";
import acceptFriendRouter from "./routes/acceptFriend.ts";
import rejectFriendRouter from "./routes/rejectFriend.ts";
import logoutRouter from "./routes/logout.ts";
import getInvitesRouter from "./routes/getInvites.ts";
import searchFriendRouter from "./routes/searchFriend.ts";
import sendMessageRouter from "./routes/sendMessage.ts";
import getLastMessagesRouter from "./routes/getLastMessages.ts";

const PORT = config().PORT || 3000;
const HOST = config().HOST || "127.0.0.1";

const app = new Application();

app.use(oakCors({
	origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
	credentials: true,
}));
app.use(json);

app.use(helloRouter.routes());
app.use(loginRouter.routes());
app.use(registerRouter.routes());
app.use(confirmEmailRouter.routes());
app.use(resendEmailRouter.routes());
app.use(sayNameRouter.routes());
app.use(inviteFriendRouter.routes());
app.use(acceptFriendRouter.routes());
app.use(rejectFriendRouter.routes());
app.use(logoutRouter.routes());
app.use(getInvitesRouter.routes());
app.use(searchFriendRouter.routes());
app.use(sendMessageRouter.routes());
app.use(getLastMessagesRouter.routes());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
