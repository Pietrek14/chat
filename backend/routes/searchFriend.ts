import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';
import User from '../models/user.ts';

const router = new Router();

router.post("/search", logged, async (ctx: AuthorizedContext) => {
	const { search } = await ctx.request.body().value;

	if(!ctx.user || !ctx.user.id)
		return;

	if(!search) {
		ctx.response.body = {
			result: await User.search("", ctx.user.id),
		};
		return;
	}

	ctx.response.body = {
		result: await User.search(search, ctx.user.id),
	};
});

export default router;