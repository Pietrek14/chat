import config from "../config.js";

window.onload = () => {
	const loginForm = document.getElementById("login-form");
	const emailInput = document.getElementById("email-input");
	const passwordInput = document.getElementById("password-input");

	loginForm.onsubmit = async (e) => {
		e.preventDefault();

		const email = emailInput.value;
		const password = passwordInput.value;

		const request = await fetch(`${config.apiUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		switch (request.status) {
			case 200: {
				const response = await request.json();
				const { token } = response;

				localStorage.setItem("token", token);
				window.location.href = "/";

				break;
			}
			
			case 401: {
				alert("wrong password");
				break;
			}

			case 404: {
				alert("user not found");
			}
		}
	};
};