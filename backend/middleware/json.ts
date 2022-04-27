import { Context } from '../deps.ts';

async function json(ctx: Context, next: Function) {
	ctx.response.type = "application/json";
	await next();
}

export default json;