import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';

const router = new Router();

router.get("/name", logged, (ctx: AuthorizedContext) => {
	ctx.response.body = {
		message: ctx.user?.username,
	};
});

export default router;