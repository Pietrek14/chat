export default interface User {
	id?: number,
	email?: string,
	username?: string,
	hash?: string,
	salt?: string,
	signup_date?: Date,
}