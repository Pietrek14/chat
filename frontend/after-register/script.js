import config from "../config.js";

const params = new URLSearchParams(window.location.search);
const email = params.get('email');

console.log(email);

window.onload = () => {
	const resendEmailButton = document.getElementById('resend-email-button');

	resendEmailButton.onclick = async () => {
		const request = await fetch(`${config.apiUrl}/resendEmail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		});

		const response = await request.json();

		if (request.status === 200) {
			alert('we sent you the email again');
		}

		if (request.status === 409) {
			alert(`you have to wait ${Math.floor(response.timeLeft)} seconds more before you can resend the email`);
		}
	};
};