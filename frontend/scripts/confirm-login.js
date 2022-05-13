import config from "../config.js";

const request = await fetch(`${config.apiUrl}/name`, {
	method: "GET",
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
	}
});

if(request.status !== 200) {
	window.location.assign(`${config.myUrl}/frontend/login/`);
}