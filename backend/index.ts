import { Application, config } from "./deps.ts";

// MIDDLEWARE
import json from "./middleware/json.ts";
import { oakCors } from "./deps.ts";

// ROUTER
import helloRouter from "./routes/hello.ts";
import loginRouter from "./routes/login.ts";
import registerRouter from "./routes/register.ts";
import confirmEmailRouter from "./routes/confirmEmail.ts";

const PORT = config().PORT || 3000;
const HOST = config().HOST || "localhost";

const app = new Application();

app.use(oakCors());
app.use(json);

app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());
app.use(registerRouter.routes());
app.use(registerRouter.allowedMethods());
app.use(confirmEmailRouter.routes());
app.use(confirmEmailRouter.allowedMethods());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
