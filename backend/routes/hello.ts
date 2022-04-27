import { Router } from "../deps.ts";

const helloRouter = new Router();

helloRouter.get("/hello", ctx => {
	ctx.response.body = { message: "Hello World!" };
});

export default helloRouter;