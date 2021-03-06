import config from "../config.js";
import alert from "../scripts/util/alert-box.js";

window.onload = () => {
	const form = document.getElementById('register-form');
	const emailInput = document.getElementById('email-input');
	const loginInput = document.getElementById('login-input');
	const passwordInput = document.getElementById('password-input');
	const passwordConfirmInput = document.getElementById('password-confirm-input');

	form.onsubmit = async (e) => {
		e.preventDefault();

		const email = emailInput.value;
		const login = loginInput.value;
		const password = passwordInput.value;
		const passwordConfirm = passwordConfirmInput.value;

		if(password !== passwordConfirm) {
			alert('passwords don\'t match');
			return;
		}

		const request = await fetch(`${config.apiUrl}/register`, {
			method: 'POST',
			
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				username: login,
				password: password,
			})
		});

		const response = await request.json();

		if(request.status === 409) {
			if(response.substatus === 0) {
				alert('email already exists');
			} else {
				alert('waiting for email confirmation');
			}

			return;
		}
		
		if(request.status === 200) {
			window.location.assign(`../after-register/?email=${email}`);
			return;
		}

		alert('something went wrong');
	};
};