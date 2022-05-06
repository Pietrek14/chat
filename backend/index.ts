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

const PORT = config().PORT || 3000;
const HOST = config().HOST || "localhost";

const app = new Application();

app.use(oakCors());
app.use(json);

app.use(helloRouter.routes());
app.use(loginRouter.routes());
app.use(registerRouter.routes());
app.use(confirmEmailRouter.routes());
app.use(resendEmailRouter.routes());
app.use(sayNameRouter.routes());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
