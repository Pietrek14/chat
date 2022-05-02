import config from '../config.js';

const params = new URLSearchParams(window.location.search);
const code = params.get('code');

window.onload = async () => {
	const output = document.getElementById('output');

	if(!code) {
		output.innerText = 'make sure you entered this page through an email';
		return;
	}

	const request = await fetch(`${config.apiUrl}/confirmEmail`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code: code,
		}),
	});

	if(request.status === 404) {
		output.innerText = 'your confirmation code has probably expired. to get a new one, register again.';
		return;
	}

	if(request.status !== 200) {
		output.innerText = 'something went wrong. please try again.';
		return;
	}

	output.innerText = 'your account has been confirmed. you can now log in.';
};