import config from "../config.js";
import alert from "./util/alert-box.js";

const logoutButton = document.getElementById("logout");

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

	const body = await request.json();

	console.log(body.name);
};

logoutButton.onclick = async () => {
	const request = await fetch(`${config.apiUrl}/logout`, {
		method: "POST",
		credentials: "include",
	});

	if(request.status !== 200) {
		alert("something went wrong");
		return;
	}

	window.location.assign("./login/");
};