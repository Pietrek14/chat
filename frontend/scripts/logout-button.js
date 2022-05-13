import config from "../config.js";
import alert from "./util/alert-box.js";

const logoutButton = document.getElementById("logout");

logoutButton.onclick = async () => {
	const request = await fetch(`${config.apiUrl}/logout`, {
		method: "POST",
		credentials: "include",
	});

	if(request.status !== 200) {
		alert("something went wrong");
		return;
	}

	window.location.assign(`${config.myUrl}/login`);
};