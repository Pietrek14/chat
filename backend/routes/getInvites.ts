import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';
import FriendRequest from '../models/friendRequest.ts';
import User from '../models/user.ts';

const router = new Router();

router.get("/invites", logged, async (ctx: AuthorizedContext) => {
	if(!ctx.user?.id)
		return;

	const invites = await FriendRequest.getByAdresseeId(ctx.user?.id);

	ctx.response.body = {
		invites: invites
	};
});

export default router;