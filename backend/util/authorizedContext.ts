import { Context } from '../deps.ts';
import User from '../interfaces/user.ts';

class AuthorizedContext extends Context {
	user?: User;
}

export default AuthorizedContext;