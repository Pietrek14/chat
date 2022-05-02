export default interface EmailConfirmation {
	id?: number,
	code?: string,
	email?: string,
	username?: string,
	hash?: string,
	signup_date?: Date,
	last_email?: Date,
}