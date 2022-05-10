import config from "../config.js";

window.onload = async () => {
	const request = await fetch(`${config.apiUrl}/name`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if(request.status !== 200) {
		window.location.assign("./login/");
	}

	// const body = await request.json();

	// console.log(body.name);
};