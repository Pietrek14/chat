export default interface Session {
	id?: number,
	user_id?: number,
	hash?: string,
	expiry?: Date,
}