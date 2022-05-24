import { alert } from "./scripts/util/alert-box.js";
import config from "./config.js";

const conversations = document.getElementById("conversations");
const messagesDiv = document.getElementById("messages");

const nameRequest = await fetch(`${config.apiUrl}/name`, {
	method: "GET",
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
	},
});

const body = await nameRequest.json();

const ownName = body.message;

let activeConversation = null;

let currentAuthor = null,
	currentAuthorBack = null,
	messagesNum = 0,
	allMessagesLoaded = false;

function createMessage(message) {
	const messageGroup = document.createElement("div");
	messageGroup.classList.add("message-group");

	const messageContent = document.createElement("p");
	messageContent.classList.add("message-content");
	messageContent.innerText = message.content;
	messageGroup.appendChild(messageContent);

	// TODO: format date correctly
	const messageTime = document.createElement("span");
	messageTime.classList.add("message-time");
	messageTime.innerText = message.date;

	return messageGroup;
}

function addMessageToFront(message, author) {
	if (currentAuthorBack != author) {
		const messageBlock = document.createElement("div");
		messageBlock.classList.add("message-block");
		messagesDiv.insertBefore(messageBlock, messagesDiv.firstChild);

		const messageAuthor = document.createElement("h5");
		messageAuthor.classList.add("message-author");
		messageAuthor.innerText = author;
		messageBlock.appendChild(messageAuthor);

		const messageBlockContent = document.createElement("div");
		messageBlockContent.classList.add("message-block__content");
		messageBlock.appendChild(messageBlockContent);

		messageBlockContent.appendChild(createMessage(message));

		currentAuthorBack = author;

		if (currentAuthor == null) {
			currentAuthor = author;
		}

		return;
	}

	const newMessage = createMessage(message);
	const messageContent = document.querySelector(".message-block__content");
	messageContent.insertBefore(newMessage, messageContent.firstChild);
}

function addMessage(message, author) {
	messagesDiv.parentElement.scrollTop = 0;

	if (currentAuthor != author) {
		const messageBlock = document.createElement("div");
		messageBlock.classList.add("message-block");
		messagesDiv.appendChild(messageBlock);

		const messageAuthor = document.createElement("h5");
		messageAuthor.classList.add("message-author");
		messageAuthor.innerText = author;
		messageBlock.appendChild(messageAuthor);

		const messageBlockContent = document.createElement("div");
		messageBlockContent.classList.add("message-block__content");
		messageBlock.appendChild(messageBlockContent);

		messageBlockContent.appendChild(createMessage(message));

		currentAuthor = author;

		if (currentAuthorBack == null) {
			currentAuthorBack = author;
		}

		return;
	}

	const newMessage = createMessage(message);
	const messageContents = document.querySelectorAll(".message-block__content");
	const messageContent = messageContents[messageContents.length - 1];
	messageContent.appendChild(newMessage);
}

let currentConversator = null;

async function loadMessages(count = 30) {
	if (allMessagesLoaded) return;

	// it should be get, but chrome doesn't let me make a get request with a body
	const response = await fetch(`${config.apiUrl}/readMessages`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			friend: currentConversator,
			count: count,
			offset: messagesNum,
		}),
	});

	if (!response.ok) {
		alert("error loading conversation");
		return;
	}

	const messages = await response.json();

	messages.forEach((message) => {
		addMessageToFront(message, message.author);
	});

	messagesNum += messages.length;
	allMessagesLoaded = messages.length < count;
}

function loadConversation(friendId) {
	messagesDiv.innerHTML = "";
	currentAuthor = null;
	currentAuthorBack = null;
	currentConversator = friendId;
	messagesNum = 0;

	loadMessages();
}

function enterConversation(conversationDiv, friendId) {
	if (activeConversation) {
		activeConversation.classList.remove("active");
	}
	conversationDiv.classList.add("active");
	activeConversation = conversationDiv;

	loadConversation(friendId);
}

async function sendMessage(message) {
	const response = await fetch(`${config.apiUrl}/sendMessage`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			recipent: currentConversator,
			content: message,
		}),
	});

	if (!response.ok) {
		alert("something went wrong");
		return;
	}

	addMessage(
		{
			content: message,
			date: new Date(),
		},
		ownName
	);
}

const init = async () => {
	// Make message input do something
	const messageForm = document.getElementById("message-form");
	const messageInput = document.getElementById("message-content");

	messageForm.onsubmit = (e) => {
		e.preventDefault();
		sendMessage(messageInput.value);
		messageInput.value = "";
	};

	// Load conversations
	const response = await fetch(`${config.apiUrl}/lastMessages`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		alert("something went wrong");
		return;
	}

	const lastMessages = data.messages;

	conversations.innerHTML = "";

	lastMessages.forEach((message) => {
		const conversationDiv = document.createElement("div");
		conversationDiv.classList.add("conversation");
		conversations.appendChild(conversationDiv);

		const conversationAvatar = document.createElement("div");
		conversationAvatar.classList.add("conversation__avatar");
		conversationDiv.appendChild(conversationAvatar);

		const conversationContent = document.createElement("div");
		conversationContent.classList.add("conversation__content");
		conversationDiv.appendChild(conversationContent);

		const conversationName = document.createElement("h3");
		conversationName.classList.add("conversation__name");
		conversationName.innerText = message.author_name;
		conversationContent.appendChild(conversationName);

		const conversationLastMessage = document.createElement("p");
		conversationLastMessage.classList.add("conversation__last-message");
		if (message.content) {
			conversationLastMessage.innerText = message.content;
		} else {
			conversationLastMessage.innerText = "no message :(";
			conversationLastMessage.classList.add("conversation__no-message");
		}
		conversationContent.appendChild(conversationLastMessage);

		conversationDiv.onclick = () => {
			// Enter the conversation
			enterConversation(conversationDiv, message.author_id);
		};
	});

	if (lastMessages.length > 0) {
		enterConversation(
			document.querySelector(".conversation"),
			lastMessages[0].author_id
		);
	}

	// Load more messages as the user scrolls up
	messagesDiv.parentElement.onscroll = () => {
		if (allMessagesLoaded) return;

		// Get scroll ratio
		const scrollRatio =
			messagesDiv.parentElement.scrollTop /
			messagesDiv.parentElement.scrollHeight;

		if (scrollRatio < -0.3) {
			loadMessages();
		}
	};
};

init();
