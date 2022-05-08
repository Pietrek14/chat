document.body.innerHTML += `
<div id="alert-box"
	class="flex justify-center items-center fixed top-0 left-1/2 w-2/5 h-2/5 translate-x-[-50%] translate-y-[-100%] opacity-0 bg-primary text-white transition-all duration-1000">
	<div class="flex justify-center items-center w-11/12 h-5/6 relative border-4 border-white">
		<span id="alert-box-content">wrong password</span>
		<div id="alert-box-close" class="absolute right-2 top-2 cursor-pointer">
			<svg xmlns="http://www.w3.org/2000/svg" width="22.121" height="22.121">
				<g transform="translate(1.061 1.061)">
					<line x1="20" y2="20" fill="none" stroke="#fff"
						stroke-width="3" />
					<line x2="20" y2="20" fill="none" stroke="#fff"
						stroke-width="3" />
				</g>
			</svg>
		</div>
	</div>
</div>`;

const alertBox = document.getElementById("alert-box");
const alertBoxContent = document.getElementById("alert-box-content");
const alertBoxCloseButton = document.getElementById("alert-box-close");

let mouseOverAlertBox = false;

alertBox.onmouseover = () => {
	mouseOverAlertBox = true;
};

alertBox.onmouseleave = () => {
	mouseOverAlertBox = false;
};

function closeAlertBoxOnClick() {
	console.log(mouseOverAlertBox);
	if (!mouseOverAlertBox) {
		alertBoxClose();
	}
}

function closeAlertBoxOnEscPress(event) {
	if (event.keyCode === 27 /* esc */) {
		alertBoxClose();
	}
}

function alertBoxClose() {
	alertBox.classList.remove("alert-box-active");

	alertBoxCloseButton.onclick = null;
	document.removeEventListener("click", closeAlertBoxOnClick);
	document.removeEventListener("keydown", closeAlertBoxOnEscPress);
}

function alert(message) {
	console.log(message);
	alertBoxContent.innerHTML = message;
	alertBox.classList.add("alert-box-active");

	alertBoxCloseButton.onclick = alertBoxClose;
	document.addEventListener("click", closeAlertBoxOnClick);
	document.addEventListener("keydown", closeAlertBoxOnEscPress);
}

export default alert;
export { alert, alertBoxClose };
