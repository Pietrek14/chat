import { Application, config } from "./deps.ts";

// MIDDLEWARE
import json from "./middleware/json.ts";

// ROUTER
import helloRouter from "./routes/hello.ts";

const PORT = config().PORT || 3000;
const HOST = config().HOST || "localhost";

const app = new Application();

app.use(json);

import client from "./connection/db.ts";

const queryWithParams = await client.query(
	"select ??,email from ?? where id = ?",
	["id", "user", 1]
);
console.log(queryWithParams);

app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
