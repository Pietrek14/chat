import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import Session from '../models/session.ts';
import AuthorizedContext from '../util/authorizedContext.ts';

const router = new Router();

router.post("/logout", logged, async (ctx: AuthorizedContext) => {
	const session = await ctx.cookies.get('session');

	if(session)
		await Session.deleteByHash(session);

	ctx.response.body = {
		message: "logged out",
	};
	ctx.cookies.delete('session');
});

export default router;