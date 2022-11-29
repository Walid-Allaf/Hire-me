let popupClose = document.querySelector(".popup-wrap"),
  loginError = document.querySelector(".login-error");

let haveAccount = document.querySelector("#have-account"),
  login = document.querySelector(".login"),
  cancel = document.querySelector(".popup-box button.cancel"),
  nameInput = document.querySelector("#user-or-company"),
  passInput = document.querySelector("#pass");

haveAccount.addEventListener("click", function () {
  popupClose.style.display = "block";
});

// let copyAccounts = JSON.parse(localStorage.getItem("account"));
login.addEventListener("click", function () {
  let copyAccounts = JSON.parse(localStorage.getItem("account"));
  for (let i = 0; i < copyAccounts.length; i++) {
    if (
      nameInput.value == copyAccounts[i].name &&
      passInput.value == copyAccounts[i].password
    ) {
      for (let j = 0; j < copyAccounts.length; j++) {
        copyAccounts[j].register = false;
        window.localStorage.setItem("account", JSON.stringify(copyAccounts));
      }

      copyAccounts[i].register = true;
      window.localStorage.setItem("account", JSON.stringify(copyAccounts));
      open("jobs.html", "_self");
      loginError.style.display = "none";
      console.log("Found");
    } else {
      loginError.style.display = "block";
    }
  }
});
nameInput.addEventListener("focus", removeErrors);
passInput.addEventListener("focus", removeErrors);
function removeErrors() {
  loginError.style.display = "none";
}
cancel.addEventListener("click", function () {
  popupClose.style.display = "none";
});
