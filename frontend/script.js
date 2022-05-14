import { alert } from "./scripts/util/alert-box.js";
import congif from './config.js'

const conversations = document.getElementById('conversations');

window.onload = async () => {
	const response = await fetch(`${congif.apiUrl}/lastMessages`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	
	const data = await response.json();
	
	if(!response.ok) {
		alert("something went wrong");
		return;
	}

	const messages = data.messages;

	conversations.innerHTML = "";

	messages.forEach(message => {
		const conversationDiv = document.createElement('div');
		conversationDiv.classList.add('conversation');
		conversations.appendChild(conversationDiv);

		const conversationAvatar = document.createElement('div');
		conversationAvatar.classList.add('conversation__avatar');
		conversationDiv.appendChild(conversationAvatar);

		const conversationContent = document.createElement('div');
		conversationContent.classList.add('conversation__content');
		conversationDiv.appendChild(conversationContent);

		const conversationName = document.createElement('h3');
		conversationName.classList.add('conversation__name');
		conversationName.innerText = message.author_name;
		conversationContent.appendChild(conversationName);

		const conversationLastMessage = document.createElement('p');
		conversationLastMessage.classList.add('conversation__last-message');
		conversationLastMessage.innerText = message.content;
		conversationContent.appendChild(conversationLastMessage);
	});
}