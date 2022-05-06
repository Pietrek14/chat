import AuthorizedContext from '../util/authorizedContext.ts';
import Session from '../models/session.ts';

async function logged(ctx: AuthorizedContext, next: () => Promise<unknown>) {
	const session = await ctx.cookies.get('session');

	if(!session) {
		ctx.response.status = 401;
		return;
	}

	const user = await Session.getUserByHash(session);

	if(!user) {
		ctx.response.status = 401;
		return;
	}

	ctx.user = user;

	await next();
}

export default logged;