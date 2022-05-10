import { Router } from '../deps.ts';
import logged from '../middleware/logged.ts';
import AuthorizedContext from '../util/authorizedContext.ts';
import FriendRequest from '../models/friendRequest.ts';

const router = new Router();

router.get("/invites", logged, async (ctx: AuthorizedContext) => {
	if(!ctx.user?.id)
		return;

	const invites = await FriendRequest.getByAdresseeId(ctx.user?.id);

	ctx.response.body = {
		invites: invites.map((invite) => {
			return {
				requester: invite.requester,
				adressee: invite.adressee,
				code: invite.code,
				date: invite.creation_date,
			};
		}).sort(
			(a, b) => {
				if(!a.date || !b.date)
					return 0;

				// From the newest to the oldest
				return b.date.getTime() - a.date.getTime();
			}
		),
	};
});

export default router;