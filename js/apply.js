let username = document.querySelector("#username"),
  phoneNumber = document.querySelector("#number"),
  mail = document.querySelector("#mail"),
  cv = document.querySelector("#cv"),
  cancel = document.querySelector(".cancel"),
  apply = document.querySelector(".continue"),
  usernameError = document.querySelector(".username-error"),
  numberError = document.querySelector(".number-error"),
  mailError = document.querySelector(".mail-error"),
  cvError = document.querySelector(".cv-error");

let applyOrders = [];
if (localStorage.getItem("apply")) {
  applyOrders = JSON.parse(localStorage.getItem("apply"));
}

let copyAccounts = JSON.parse(localStorage.getItem("account"));

cancel.addEventListener("click", function () {
  window.history.back();
});
let codeCV = "Walid";
cv.addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);

  reader.addEventListener("load", () => {
    codeCV = reader.result;
  });
  console.log(cv.value);
});

apply.addEventListener("click", function (e) {
  let usernameValid = false,
    phoneValid = false,
    mailValid = false,
    cvValid = false;

  // Username Validation
  // Search username in accounts and check (Is he personal and login)
  for (let i = 0; i < copyAccounts.length; i++) {
    if (
      username.value == copyAccounts[i].name &&
      copyAccounts[i].type == "personal" &&
      copyAccounts[i].register == true
    ) {
      console.log("Exist");
      usernameValid = true;
      break;
    }
  }
  if (!usernameValid) {
    console.log("Not Exist");
    usernameError.innerHTML = "Wrong username or you aren't registered";
    usernameError.style.display = "block";
  }

  // Phonenumber Validation
  const number = new RegExp("(?=.*[0-9])");

  if (phoneNumber.value == "") {
    console.log("Invalid");
    numberError.innerHTML = "Phone number field mustn't be empty";
    numberError.style.display = "block";
  } else if (phoneNumber.value.length != 10) {
    console.log("Invalid");
    numberError.innerHTML = "Phone number must be 10 numbers";
    numberError.style.display = "block";
  } else if (!phoneNumber.value.match(number)) {
    console.log("Invalid");
    numberError.innerHTML = "Phone number must contain just numbers";
    numberError.style.display = "block";
  } else {
    console.log("valid");
    phoneValid = true;
  }

  // Email Validation
  if (mail.value == "") {
    mailError.innerHTML = "Email field mustn't be empty";
    mailError.style.display = "block";
  } else if (
    !mail.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
  ) {
    mailError.innerHTML = "Please enter a valid email";
    mailError.style.display = "block";
  } else {
    mailValid = true;
  }
  // CV Validation
  if (cv.value == "") {
    cvError.innerHTML = "Please Upload CV";
    cvError.style.display = "block";
  } else {
    cvError.innerHTML = cv.value;
    cvError.style.color = "blue";
    cvError.style.display = "block";
    cvValid = true;
  }

  // Apply if Validation is Done
  if (usernameValid && phoneValid && mailValid && cvValid) {
    let whoApply;
    for (let i = 0; i < copyAccounts.length; i++) {
      if (copyAccounts[i].register) {
        whoApply = copyAccounts[i].id;
        console.log(whoApply);
      }
    }

    addApplyToArray(
      JSON.parse(localStorage.getItem("special")),
      whoApply,
      username.value,
      phoneNumber.value,
      mail.value,
      codeCV
    );
  }
  // Hide Errors From Fooooorm
  username.addEventListener("focus", removeErrors);
  phoneNumber.addEventListener("focus", removeErrors);
  mail.addEventListener("focus", removeErrors);
  cv.addEventListener("focus", removeErrors);
  function removeErrors() {
    usernameError.style.display = "none";
    numberError.style.display = "none";
    mailError.style.display = "none";
    cvError.style.display = "none";
  }

  // Show Popup
  if (
    usernameValid === true &&
    phoneValid === true &&
    mailValid === true &&
    cvValid === true
  ) {
    document.querySelector(".popup-wrap").style.display = "block";
    document.querySelector(".popup-box").classList.remove("transform-out");
    document.querySelector(".popup-box").classList.add("transform-in");
    e.preventDefault();
    document
      .querySelector(".popup-close")
      .addEventListener("click", function () {
        document.querySelector(".popup-wrap").style.display = "none";

        document.querySelector(".popup-box").classList.remove("transform-out");
        document.querySelector(".popup-box").classList.add("transform-in");
        open("jobs.html", "_self");
        e.preventDefault();
      });
  }
});

function addApplyToArray(special, whoApply, username, phoneNumber, mail, cv) {
  // Apply Data
  const apply = {
    special: special,
    whoApply: whoApply,
    id: Date.now(),
    username: username,
    phoneNumber: phoneNumber,
    mail: mail,
    cv: cv,
  };

  // Add Apply To Array
  applyOrders.push(apply);
  console.log(apply);

  // Add Apply To Local Storage
  addDataToLocalStorageFrom(applyOrders);
}

function addDataToLocalStorageFrom(applyOrders) {
  window.localStorage.setItem("apply", JSON.stringify(applyOrders));
}
