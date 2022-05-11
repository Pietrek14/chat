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

	const formattedInvites: { requester: { email: string, name: string }, code: string, date: Date }[] = [];

	for(let i = 0; i < invites.length; i++) {
		const invite = invites[i];

		if(!invite.requester || !invite.code || !invite.creation_date)
			return;

		const requester = await User.getById(invite.requester);

		formattedInvites.push({
			requester: {
				email: requester.email,
				name: requester.username,
			},
			code: invite.code,
			date: invite.creation_date,
		});
	}

	ctx.response.body = {
		invites: formattedInvites.sort(
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