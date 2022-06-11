export default (date) => {
	const now = new Date();

	const diff = (now.getTime() - date.getTime()) / 1000; // in seconds

	if (diff < 60) {
		return "just now";
	}

	if (diff < 60 * 60) {
		return `${Math.floor(diff / 60)} minutes ago`;
	}

	if (diff < 60 * 60 * 24) {
		return `${Math.floor(diff / (60 * 60))} hours ago`;
	}

	if(diff < 60 * 60 * 24 * 2) {
		return "yesterday";
	}

	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};