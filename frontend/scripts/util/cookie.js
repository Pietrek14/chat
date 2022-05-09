function getCookie(cname) {
	const name = cname + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookies = decodedCookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];

		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);
		}

		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}

	return undefined;
}

export { getCookie };