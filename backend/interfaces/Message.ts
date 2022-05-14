export default interface Message {
	id?: number;
	content?: string;
	author?: number;
	recipent?: number;
	date?: Date;
	reply?: number | null;
}