const nameIn = document.getElementById("name");
const emailIn = document.getElementById("mail");
const ccnumIn = document.getElementById("cc-num");
const cvvIn = document.getElementById("cvv");
const zipcodeIn = document.getElementById("zip");

const jobTitleSelect = document.getElementById("title");
const otherJobTitleDiv = document.getElementById("other-job-title");
const otherJobTitleInput = document.getElementById("other-title");
const colorOptions = document.querySelectorAll('#color option');
const designSelect = document.getElementById("design");
const activitiesFieldset = document.querySelector(".activities");
const activitiesCheckboxes = document.querySelectorAll('.activities input[type="checkbox"]');
let activitiesCostSpan = document.querySelector(".activities-cost span");
let activitiesCostTotal = 0;
activitiesCostSpan.innerText = activitiesCostTotal;
let designSelected;
const creditCardDiv = document.getElementById("credit-card");
const bitcoinDiv = document.getElementById("bitcoin");
const paypalDiv = document.getElementById("paypal");
const paymentSelect = document.getElementById("payment");
const paymentSelectOptions = document.querySelectorAll("#payment option");
const mainForm = document.querySelector("form");

document.addEventListener("load", nameIn.focus());

otherJobTitleDiv.style.display = "none";

jobTitleSelect.addEventListener("change", function() {
	if ( jobTitleSelect.value == "other" ) {
		otherJobTitleDiv.style.display = "block";
	} else {
		otherJobTitleDiv.style.display = "none";
	}
});

// Updated
colorOptions[0].innerText = "Please select a T-shirt theme";
colorOptions.forEach(option => option.hidden = "true");
//

designSelect.addEventListener("change", function() {
	designSelected = designSelect.value;
	if ( designSelected.includes("pun") ) {
		colorOptions[1].selected = "true";
		for ( let i=0; i<colorOptions.length; i++) {
			colorOptions[i].hidden = "true";
		}
		for ( let i=0; i<colorOptions.length; i++) {
			if ( colorOptions[i].innerText.includes("Pun") ) {
				colorOptions[i].removeAttribute("hidden");
			}
		}
	} else if ( designSelected.includes("Select") ) {
		// Updated
		colorOptions[0].selected = "true";
		colorOptions.forEach(option => option.hidden = "true");
		//
	} else {
		colorOptions[4].selected = "true";
		for ( let i=0; i<colorOptions.length; i++) {
			colorOptions[i].hidden = "true";
		}
		for ( let i=0; i<colorOptions.length; i++) {
			if ( ! colorOptions[i].innerText.includes("Pun") ) {
				colorOptions[i].removeAttribute("hidden");
			}
		}
	}
	colorOptions[0].hidden = "true";
});

activitiesFieldset.addEventListener("change", function(e) {
	if ( e.target.checked == true ) {
		activitiesCostTotal += parseInt(e.target.parentNode.innerText.slice(-3), 10);
	} else {
		activitiesCostTotal -= parseInt(e.target.parentNode.innerText.slice(-3), 10);
	}
	activitiesCostSpan.innerText = activitiesCostTotal;
})

disableConflictingActivity = (selectedActivity, conflictingActivity) => {
	if ( selectedActivity.checked == true ) {
		conflictingActivity.disabled = "true";
		conflictingActivity.parentNode.style.color = "red";
	} else {
		conflictingActivity.removeAttribute("disabled");
		conflictingActivity.parentNode.style.color = "black";
	}
}

activitiesFieldset.addEventListener("change", function(e) {
	if (e.target == activitiesCheckboxes[1]) {
		disableConflictingActivity(activitiesCheckboxes[1], activitiesCheckboxes[3]);
	} else if (e.target == activitiesCheckboxes[2]) {
		disableConflictingActivity(activitiesCheckboxes[2], activitiesCheckboxes[4]);
	} else if (e.target == activitiesCheckboxes[3]) {
		disableConflictingActivity(activitiesCheckboxes[3], activitiesCheckboxes[1]);
	} else if (e.target == activitiesCheckboxes[4]) {
		disableConflictingActivity(activitiesCheckboxes[4], activitiesCheckboxes[2]);
	}
});

paymentSelectOptions[0].hidden = true;
creditCardDiv.style.display = "block";
bitcoinDiv.style.display = "none";
paypalDiv.style.display = "none";

paymentSelect.addEventListener("change", function() {
	if ( paymentSelect.value == "credit card" ) {
		creditCardDiv.style.display = "block";
		bitcoinDiv.style.display = "none";
		paypalDiv.style.display = "none";
	} else if ( paymentSelect.value == "bitcoin" ) {
		creditCardDiv.style.display = "none";
		bitcoinDiv.style.display = "block";
		paypalDiv.style.display = "none";
	} else {
		creditCardDiv.style.display = "none";
		bitcoinDiv.style.display = "none";
		paypalDiv.style.display = "block";
	}
})

// **Form Validation**

createErrorMessage = (errorMessage) => {
	let newElement = document.createElement("div");
	newElement.className += " error-msg";
	newElement.innerText = errorMessage;
	return newElement;
}

insertAfterElement = (referenceElement, newElement) => {
	referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

const updateElementClasses = {
	add : (element, className) => {
		let classArray = element.className.split(' ');
		if (classArray.indexOf(className) < 0) {
		    classArray.push(className)
		  }
		  element.className = classArray.join(' ')
	},
	remove : (element, className) => {
		let classArray = element.className.split(' ');
		let removeIndex = classArray.indexOf(className)
		if (removeIndex > -1) {
		    classArray.splice(removeIndex, 1)
		}
		element.className = classArray.join(' ')
	}
}

mainForm.addEventListener("submit", function(e) {
	e.preventDefault();
	function FormField(fieldElement, validationTest, errorNode, errorMsg) {
		const errorBorder = "error-border";
		this.fieldElement = fieldElement;
		this.validationTest = validationTest;
		this.errorNode = errorNode;
		this.errorMsg = errorMsg;
		this.validate = () => {
			if ( this.validationTest ) {
				if ( this.fieldElement.nextElementSibling == null || this.fieldElement.nextElementSibling.innerText !== this.errorMsg ) {
					this.errorNode = createErrorMessage(this.errorMsg);
					insertAfterElement(this.fieldElement, this.errorNode);
				}
			updateElementClasses.add(this.fieldElement, errorBorder);
			return false;
			} else {
				if ( this.fieldElement.nextElementSibling !== null &&
					 this.fieldElement.nextElementSibling.innerText == this.errorMsg
					) {
					this.fieldElement.nextElementSibling.innerText = "";
					updateElementClasses.remove(this.fieldElement, errorBorder);
				}
				return true;
			}
		}
	};

	let nameErrorNode;
	const nameField = new FormField(
		nameIn,
		( ! nameIn.value.trim() ),
		nameErrorNode,
		"Name is required.");
	nameField.validate();

	let emailErrorNode;
	const emailField = new FormField(
		emailIn,
		( ! /^[a-z0-9][a-z0-9-_\.]+@[a-z0-9][a-z0-9-]+[a-z0-9]\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(emailIn.value) ),
		emailErrorNode,
		"Please enter a valid email address.");
	emailField.validate();

	let otherJobErrorNode;
	const otherJobField = new FormField(
		otherJobTitleInput,
		(jobTitleSelect.value == "other" && otherJobTitleInput.value.trim() == ""),
		otherJobErrorNode,
		"Please enter your job title."
		)
	otherJobField.validate();

	let activitiesErrorNode;
	const activitiesField = new FormField(
		activitiesCostSpan,
		( activitiesCostTotal == 0 ),
		activitiesErrorNode,
		"Please select at least one activity.");
	activitiesField.validate();

	let paymentSelectErrorNode;
	const paymentSelectField = new FormField(
		paymentSelect,
		( paymentSelect.value == "select_method" ),
		paymentSelectErrorNode,
		"Please select a payment method.")
	paymentSelectField.validate();

	if ( paymentSelect.value == "credit card" ) {
		let ccnumErrorNode;
		const ccnumField = new FormField(
			ccnumIn,
			( ! /^[0-9]{13,16}$/.test(ccnumIn.value) ),
			ccnumErrorNode,
			"Please enter a valid credit card number between 13 and 16 digits.");
		ccnumField.validate();

		let cvvErrorNode;
		const cvvField = new FormField(
			cvvIn,
			( ! /^[0-9]{3}$/.test(cvvIn.value) ),
			cvvErrorNode,
			"Please enter a valid 3 digit CVV number.");
		cvvField.validate();

		let zipcodeErrorNode;
		const zipcodeField = new FormField(
			zipcodeIn,
			( ! /^[0-9]{5}$/.test(zipcodeIn.value) ),
			zipcodeErrorNode,
			"Please enter a valid 5 digit zip code.");
		zipcodeField.validate();

		if (nameField.validate() &&
		emailField.validate() &&
		activitiesField.validate() &&
		paymentSelectField.validate() &&
			(ccnumField.validate() &&
			cvvField.validate() &&
			zipcodeField.validate()
			)
		)
		{
			e.target.submit();
		}
	}

	if (nameField.validate() &&
		emailField.validate() &&
		activitiesField.validate() &&
		paymentSelectField.validate() &&
		paymentSelect.value !== "credit card"
		)
	{
		e.target.submit();
	}
});
