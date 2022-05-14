import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';
import User from '../models/user.ts';

const router = new Router();

router.get("/lastMessages", logged, async (ctx: AuthorizedContext) => {
	if(!ctx.user?.id)
		return;

	ctx.response.body = {
		messages: await User.getLastMessages(ctx.user?.id),
	};
});

export default router;