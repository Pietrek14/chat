import config from "../config.js";
import alert from "../scripts/util/alert-box.js";

const pending = document.getElementById("invites");
const searchBar = document.getElementById("search-bar");
const searchField = document.getElementById("search-field");

async function getPending() {
	const response = await fetch(`${config.apiUrl}/invites`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const body = await response.json();
	const invites = body.invites;

	if (response.status !== 200) {
		alert("something went wrong");
		return;
	}

	invites.forEach((invite) => {
		const inviteDiv = document.createElement("div");
		inviteDiv.classList.add("invite");

		const inviteHeader = document.createElement("div");
		inviteHeader.classList.add("invite__header");

		const inviteAvatar = document.createElement("div");
		inviteAvatar.classList.add("invite__conversation-avatar");

		inviteHeader.appendChild(inviteAvatar);

		const inviteRequester = document.createElement("div");
		inviteRequester.classList.add("invite__requester");

		const inviteName = document.createElement("h3");
		inviteName.classList.add("invite__requester-name");
		inviteName.innerText = invite.requester_name;

		inviteRequester.appendChild(inviteName);
		inviteHeader.appendChild(inviteRequester);
		inviteDiv.appendChild(inviteHeader);

		const inviteOptions = document.createElement("div");
		inviteOptions.classList.add("invite__options");

		const inviteAccept = document.createElement("img");
		inviteAccept.classList.add("invite__option");
		inviteAccept.src = "../img/svg/tick.svg";

		inviteAccept.onclick = async () => {
			// Accept the invite
			const response = await fetch(`${config.apiUrl}/acceptFriend`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: invite.code,
				}),
			});

			if (!response.ok) {
				alert("something went wrong");
				return;
			}

			// Remove the invite from the list
			inviteDiv.style.animation = "invite-disappear 0.5s forwards";
			inviteDiv.onanimationend = () => {
				inviteDiv.remove();
			};

			alert(`friend added: ${invite.requester_name}`);
		};

		inviteOptions.appendChild(inviteAccept);

		const inviteReject = document.createElement("img");
		inviteReject.classList.add("invite__option");
		inviteReject.src = "../img/svg/x.svg";

		inviteReject.onclick = async () => {
			// Reject the invite
			const response = await fetch(`${config.apiUrl}/rejectFriend`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: invite.code,
				}),
			});

			if (!response.ok) {
				alert("something went wrong");
				return;
			}

			// Remove the invite from the list
			inviteDiv.style.animation = "invite-disappear 0.5s forwards";
			inviteDiv.onanimationend = () => {
				inviteDiv.remove();
			};

			alert(`friend rejected: ${invite.requester_name}`);
		};

		inviteOptions.appendChild(inviteReject);
		inviteDiv.appendChild(inviteOptions);

		pending.appendChild(inviteDiv);
	});
}

function updateSearchField(users) {
	searchField.innerHTML = "";

	users.forEach((user) => {
		const userDiv = document.createElement("div");

		userDiv.classList.add("search-result");

		searchField.appendChild(userDiv);

		const userName = document.createElement("span");

		userName.classList.add("search-result__name");
		userName.innerText = user.name;

		userDiv.appendChild(userName);

		const userEmail = document.createElement("span");

		userEmail.classList.add("search-result__email");
		userEmail.innerText = user.email;

		userDiv.appendChild(userEmail);

		const userButton = document.createElement("button");

		userButton.classList.add("search-result__invite-button");
		userButton.innerText = "invite";
		userButton.onclick = async () => {
			const response = await fetch(`${config.apiUrl}/inviteFriend`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					friendsEmail: user.email,
				}),
			});

			if (!response.ok) {
				alert("something went wrong");
				return;
			}

			userDiv.remove();

			alert(`invite sent to ${user.name}`);
		};

		userDiv.appendChild(userButton);
	});
}

searchBar.oninput = async () => {
	const search = searchBar.value;

	const response = await fetch(`${config.apiUrl}/search`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			search: search,
		}),
	});

	if (!response.ok) {
		alert("something went wrong");
		return;
	}

	const body = await response.json();

	const users = body.result;

	updateSearchField(users);
};

// i know this is stupid, but we are going to add more functions to window.onload event in the future
window.onload = () => {
	getPending();
	searchBar.oninput();
};
