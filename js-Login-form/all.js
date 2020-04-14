const inputs = document.querySelectorAll('.form .form-group .form-element');

for (let input of inputs) {
	input.addEventListener('focus', function () {
		let formgroup = input.parentNode;
		formgroup.classList.add('is-active');
	});
	input.addEventListener('blur', function () {
		let formgroup = input.parentNode;
		if (input.value == "")
			formgroup.classList.remove('is-active');
	});
}