export default (date) => {
	const now = new Date();
	date = new Date(date);

	const diff = (now - date) / 1000; // in seconds

	console.log(typeof date);

	if (diff < 60) {
		return "just now";
	}

	if (diff < 60 * 60) {
		return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
	}

	if (diff < 60 * 60 * 24) {
		return `${Math.floor(diff / (60 * 60))} hour${Math.floor(diff / 60 * 60) > 1 ? 's' : ''} ago`;
	}

	if(diff < 60 * 60 * 24 * 2) {
		return "yesterday";
	}

	return `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
};