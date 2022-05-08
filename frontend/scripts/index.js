import alert from "./util/alert-box.js";

document.onkeydown = e => {
	if (e.key === 'a') {
		alert('hello');
	}
};