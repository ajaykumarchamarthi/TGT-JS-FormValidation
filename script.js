const fnameEl = document.querySelector("#fname");
const lnameEl = document.querySelector("#lname");
const emailEl = document.querySelector("#email");
const mobileEl = document.querySelector("#mobile");
const addressEl = document.querySelector("#address");
const pinEl = document.querySelector("#pin");

const form = document.querySelector(".auth-form");

// Utility functions

// isRequired() function returns true if the input argument is empty
const isRequired = (value) => (value === "" ? false : true);

// isBetween() function returns false if the length argument is not between the min and max argument
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// Email Validation
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))#((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{5,}))$/;
  return re.test(email);
};

// Mobile Number Validation
const isMobileNumberValid = (mobile) => {
  const re = /^\d{10}$/;
  return re.test(mobile);
};

// PinCode Validation
const isPinCodeValid = (pin) => {
  const re = /^\d{6}$/;
  return re.test(pin);
};

// showError() function highlights the border of the input field and displays an error message if the input field is invalid

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;

  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("p");
  error.textContent = message;
};

// showSuccess function highlights the border of input field as green border and indicates it is valid.

// the showSuccess() function removes the error class, adds the success class, and set the error message to blank.

const checkFname = () => {
  let valid = false;

  const min = 1,
    max = 64;

  const fname = fnameEl.value.trim();

  if (!isRequired(fname)) {
    showError(fnameEl, "First Name is Required Field");
  } else if (!isBetween(fname.length, min, max)) {
    showError(
      fnameEl,
      `Username must be between atleast ${min} and ${max} characters.`
    );
  } else {
    showSuccess(fnameEl);
    valid = true;
  }
  return valid;
};

const checkLname = () => {
  let valid = false;

  const lname = lnameEl.value.trim();

  if (!isRequired(lname)) {
    showError(lnameEl, "Last Name is Required Field");
  } else {
    showSuccess(lnameEl);
    valid = true;
  }
  return valid;
};

const checkMobile = () => {
  let valid = false;

  const min = 10,
    max = 10;

  const mobile = mobileEl.value.trim();

  const validMobile = isMobileNumberValid(mobile);

  if (!isRequired(mobile)) {
    showError(mobileEl, "Mobile Number is Required Field");
  } else if (!isBetween(mobile.length, min, max)) {
    showError(mobileEl, "Mobile Number should be length of 10");
  } else if (!validMobile) {
    showError(mobileEl, "Mobile Number should contain only digits");
  } else {
    showSuccess(mobileEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;

  const email = emailEl.value.trim();

  const validEmail = isEmailValid(email);

  if (!isRequired(email)) {
    showError(emailEl, "Email is Required Field");
  } else if (!validEmail) {
    showError(
      emailEl,
      "Please enter a valid email. Email must include # after email prefix and after . should be 5 char"
    );
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkAddress = () => {
  let valid = false;

  const address = addressEl.value.trim();

  if (!isRequired(address)) {
    showError(addressEl, "Address is Required Field");
  } else {
    showSuccess(addressEl);
    valid = true;
  }
  return valid;
};

const checkPin = () => {
  let valid = false;

  const min = 6,
    max = 6;

  const pin = pinEl.value.trim();

  const validPinCode = isPinCodeValid(pin);

  if (!isRequired(pin)) {
    showError(pinEl, "Pincode is required Field");
  } else if (!isBetween(pin.length, min, max)) {
    showError(pinEl, "Pincode length must be length of 6 character");
  } else if (!validPinCode) {
    showError(pinEl, "Pincode should contain only digits");
  } else {
    showSuccess(pinEl);
    valid = true;
  }
  return valid;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("p");
  error.textContent = "";
};

form.addEventListener("input", function (event) {
  switch (event.target.id) {
    case "fname":
      checkFname();
      break;
    case "lname":
      checkLname();
      break;
    case "mobile":
      checkMobile();
      break;
    case "email":
      checkEmail();
      break;
    case "address":
      checkAddress();
      break;
    case "pin":
      checkPin();
      break;
  }
});

// Restricting Only numeric digits allowed to enter in the input box

function isNumber(evt) {
  // evt = (evt) ? evt : window.event; fallback code
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isFnameValid = checkFname(),
    isLnameValid = checkLname(),
    isEmailValid = checkEmail(),
    isMobilenoValid = checkMobile(),
    isAddressValid = checkAddress(),
    isPinValid = checkPin();

  const isFormValid =
    isFnameValid &&
    isLnameValid &&
    isEmailValid &&
    isMobilenoValid &&
    isAddressValid &&
    isPinValid;

  if (isFormValid) {
    alert(
      `Form Submitted Succesfully \nFull Name is - ${fname.value.trim()} ${lname.value.trim()} \nMobile Number - ${mobileEl.value.trim()} \nEmail - ${emailEl.value.trim()} \nAddress - ${addressEl.value.trim()} \nPinCode - ${pinEl.value.trim()}`
    );
    document.querySelector("form").reset();

    // fetch("http://localhost:4000/api/v1/users/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstName: fnameEl.value.trim(),
    //     lastName: lnameEl.value.trim(),
    //     emailAddress: emailEl.value.trim(),
    //     address: addressEl.value.trim(),
    //     mobileNumber: mobileEl.value.trim(),
    //     pinCode: pinEl.value.trim(),
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => alert(data.status))
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  }
});
