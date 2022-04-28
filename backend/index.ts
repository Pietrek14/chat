import { Application, config } from "./deps.ts";

// MIDDLEWARE
import json from "./middleware/json.ts";

// ROUTER
import helloRouter from "./routes/hello.ts";
import loginRouter from "./routes/login.ts";

const PORT = config().PORT || 3000;
const HOST = config().HOST || "localhost";

const app = new Application();

app.use(json);

app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
