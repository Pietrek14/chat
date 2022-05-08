import { Context } from '../deps.ts';
import User from '../interfaces/User.ts';

class AuthorizedContext extends Context {
	user?: User;
}

export default AuthorizedContext;