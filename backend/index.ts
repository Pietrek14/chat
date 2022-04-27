import { Application } from "./deps.ts";

// MIDDLEWARE
import json from "./middleware/json.ts";

// ROUTER
import helloRouter from "./routes/hello.ts";

const env = Deno.env.toObject()
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';

const app = new Application();

app.use(json);

app.use(helloRouter.routes());
app.use(helloRouter.allowedMethods());

console.log(`Server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);