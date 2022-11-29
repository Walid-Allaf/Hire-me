// Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
var itemClassName = "carousel__photo";
(items = document.getElementsByClassName(itemClassName)),
  (totalItems = items.length),
  (slide = 0),
  (moving = true);

// To initialise the carousel we'll want to update the DOM with our own classes
function setInitialClasses() {
  // Target the last, initial, and next items and give them the relevant class.
  // This assumes there are three or more items.
  items[totalItems - 1].classList.add("prev");
  items[0].classList.add("active");
  items[1].classList.add("next");
}

let next = document.getElementsByClassName("continue")[0],
  prev = document.getElementsByClassName("cancel")[0];

let next1 = document.querySelector(".next1"),
  prev1 = document.getElementsByClassName("cancel")[1];

let next2 = document.getElementsByClassName("continue")[2],
  prev2 = document.getElementsByClassName("cancel")[2];

next.addEventListener("click", moveNext);
prev.addEventListener("click", function () {
  window.history.back();
});

// next1.addEventListener("click", moveNext);
// prev1.addEventListener("click", movePrev);

next2.addEventListener("click", openJobs);
// prev2.addEventListener("click", movePrev);

function openJobs() {
  // open("index.html", "_self");

  let haveAccount = document.querySelector("#have-account");
  haveAccount.click();
}

function disableInteraction() {
  moving = true;

  setTimeout(function () {
    moving = false;
  }, 500);
}

function moveCarouselTo(slide) {
  // Check if carousel is moving, if not, allow interaction
  if (!moving) {
    // temporarily disable interactivity
    disableInteraction();

    // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
    var newPrevious = slide - 1,
      newNext = slide + 1,
      oldPrevious = slide - 1,
      oldNext = slide + 1;

    // Test if carousel has more than three items
    if (totalItems >= 3) {
      // Checks if the new potential slide is out of bounds and sets slide numbers
      if (newPrevious <= 0) {
        oldPrevious = totalItems - 1;
      } else if (newNext >= totalItems - 1) {
        oldNext = 0;
      }

      // Check if current slide is at the beginning or end and sets slide numbers
      if (slide === 0) {
        newPrevious = totalItems - 1;
        oldPrevious = totalItems - 2;
        oldNext = slide + 1;
      } else if (slide === totalItems - 1) {
        newPrevious = slide - 1;
        newNext = 0;
        oldNext = 1;
      }

      // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

      // Based on the current slide, reset to default classes.
      items[oldPrevious].className = itemClassName;
      items[oldNext].className = itemClassName;

      // Add the new classes
      items[newPrevious].className = itemClassName + " prev";
      items[slide].className = itemClassName + " active";
      items[newNext].className = itemClassName + " next";
    }
  }
}

// Next navigation handler
function moveNext() {
  // Check if moving
  if (!moving) {
    // If it's the last slide, reset to 0, else +1
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }

    // Move carousel to updated slide
    moveCarouselTo(slide);
  }
}

// Previous navigation handler
function movePrev() {
  // Check if moving
  if (!moving) {
    // If it's the first slide, set as the last slide, else -1
    if (slide === 0) {
      slide = totalItems - 1;
    } else {
      slide--;
    }

    // Move carousel to updated slide
    moveCarouselTo(slide);
  }
}

// Initialise carousel
function initCarousel() {
  setInitialClasses();
  // setEventListeners();

  // Set moving to false now that the carousel is ready
  moving = false;
}

// make it rain
initCarousel();

// =====================================================================================
// ============= Select Page ===========================================================
// =====================================================================================

let select1 = document.getElementsByClassName("select1")[0];
let select2 = document.getElementsByClassName("select2")[0];
let company = document.getElementsByTagName("input")[0];
let personal = document.getElementById("personal");

let Step2 = document.getElementsByClassName("company")[0];
// let companyStep3 = d.getElementsByClassName("company")[1];

select1.addEventListener("click", function () {
  personal.removeAttribute("checked", "");
  company.setAttribute("checked", "");
  if (company.hasAttribute("checked")) {
    select1.style.outline = "1px solid var(--main-color)";
    select2.style.outline = "none";

    let typeofAccount = "company";

    Step2.innerHTML = "";
    Step2.innerHTML = companyStep2;
  }
  // let next1 = document.querySelector(".next1");
  // let prev1 = document.getElementsByClassName("cancel")[1];

  // console.log(next1);
  // next1.addEventListener("click", moveNext);
  // prev1.addEventListener("click", movePrev);
});

select2.addEventListener("click", function () {
  company.removeAttribute("checked", "");
  personal.setAttribute("checked", "");
  if (personal.hasAttribute("checked")) {
    select2.style.outline = "1px solid var(--main-color)";
    select1.style.outline = "none";

    let typeofAccount = "personal";

    Step2.innerHTML = "";
    Step2.innerHTML = personalStep2;
  }
});

let personalStep2 = `
  <div class="box detailes">
    <span>Step 2 of 3</span>
    <h2>Please provide us with some information</h2>
    <p>Write your full information in order to continue:</p>
    <form action="">
      <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />
        <p class="name-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="mail">Email</label>
        <input type="mail" name="mail" id="mail" />
        <p class="mail-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <p class="password-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="select">Programing Field</label>
        <select name="field" id="select">
          <option value="Front End Developer">Front End Developer</option>
          <option value="Back End Developer">Back End Developer</option>
          <option value="UI / UX Designer">UI / UX Designer</option>
          <option value="Flutter Developer">Flutter Developer</option>
          <option value="IOS Developer">IOS Developer</option>
          <option value="Software Developer">Software Developer</option>
        </select>
      </div>
      </form>
      <div class="buttons">
        <button class="cancel btn">Go back</button>
        <button class="continue btn next1">Continue</button>
      </div>
  </div>`;

let companyStep2 = `
  <div class="box detailes">
    <span>Step 2 of 3</span>
    <h2>Please provide us with some information</h2>
    <p>Write your full company information in order to continue:</p>
    <form action="">
      <div>
        <label for="name">Company name</label>
        <input type="text" name="name" id="name" />
        <p class="name-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="location">Company location</label>
        <input type="text" name="location" id="location" />
        <p class="location-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="mail">Company mail</label>
        <input type="mail" name="mail" id="mail" />
        <p class="mail-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <p class="password-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      <div>
        <label for="about">About company</label>
        <textarea name="about" id="about"></textarea>
        <p class="about-error" style="display: none; color: red; font-size: 14px"></p>
      </div>
      </form>
      <div class="buttons">
        <button class="cancel btn">Go back</button>
        <button class="continue btn next1">Continue</button>
      </div>
  </div>`;

// ============================================================================
// =========================== Local Store ====================================
// ============================================================================

let usersAccounts = [];
if (localStorage.getItem("account")) {
  usersAccounts = JSON.parse(localStorage.getItem("account"));
}

function getCompanyInformation() {
  // Field Selectors
  let name = document.forms[1].querySelector("#name"),
    location = document.forms[1].querySelector("#location"),
    mail = document.forms[1].querySelector("#mail"),
    password = document.forms[1].querySelector("#password"),
    about = document.forms[1].querySelector("#about");

  // Error Selecotrs
  let nameError = document.querySelector(".name-error"),
    locationError = document.querySelector(".location-error"),
    mailError = document.querySelector(".mail-error"),
    passwordError = document.querySelector(".password-error"),
    aboutError = document.querySelector(".about-error");

  let nameValid = false,
    locationValid = false,
    mailValid = false,
    passwordValid = false,
    aboutValid = false;

  // Name Validation
  if (name.value == "") {
    nameError.innerHTML = "Name field mustn't be empty";
    nameError.style.display = "block";
  } else {
    nameValid = true;
  }

  // Location Validation
  if (location.value == "") {
    locationError.innerHTML = "Location field mustn't be empty";
    locationError.style.display = "block";
  } else {
    locationValid = true;
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

  // Password Validation
  const lower = new RegExp("(?=.*[a-z])"),
    upper = new RegExp("(?=.*[A-Z])"),
    number = new RegExp("(?=.*[0-9])"),
    len = new RegExp("(?=.{8,})");

  if (password.value == "") {
    passwordError.innerHTML = "Password field mustn't be empty";
    passwordError.style.display = "block";
  } else if (!lower.test(password.value)) {
    passwordError.innerHTML =
      "Password must contain at least one lowercase character";
    passwordError.style.display = "block";
  } else if (!upper.test(password.value)) {
    passwordError.innerHTML =
      "Password must contain at least one uppercase character";
    passwordError.style.display = "block";
  } else if (!number.test(password.value)) {
    passwordError.innerHTML = "Password must contain at least one number";
    passwordError.style.display = "block";
  } else if (!len.test(password.value)) {
    passwordError.innerHTML = "Password must contain at least 8 character";
    passwordError.style.display = "block";
  } else {
    passwordValid = true;
  }

  // About Validation
  if (about.value == "") {
    aboutError.innerHTML = "About field mustn't be empty";
    aboutError.style.display = "block";
  } else if (about.value.length >= 100) {
    aboutError.innerHTML = "About field mustn't be more than 100 character";
    aboutError.style.display = "block";
  } else {
    aboutValid = true;
  }

  // Move To Next Page if Validation is Done
  if (nameValid && locationValid && mailValid && passwordValid && aboutValid) {
    // If it's the last slide, reset to 0, else +1
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }
    // Move carousel to updated slide
    moveCarouselTo(slide);

    typeofAccount = "company";
    addAccountToArray(
      typeofAccount,
      name.value,
      location.value,
      mail.value,
      password.value,
      about.value
    );

    let infoName = document.querySelector(".info .name span");
    infoName.innerHTML = name.value;
    let infolocation = document.querySelector(".info .location span");
    infolocation.innerHTML = location.value;
    let infoMail = document.querySelector(".info .mail span");
    infoMail.innerHTML = mail.value;
    let infoField = document.querySelector(".info .field");
    infoField.style.display = "none";
  }

  // Hide Errors From Fooooorm
  name.addEventListener("focus", removeErrors);
  location.addEventListener("focus", removeErrors);
  mail.addEventListener("focus", removeErrors);
  password.addEventListener("focus", removeErrors);
  about.addEventListener("focus", removeErrors);
  function removeErrors() {
    nameError.style.display = "none";
    locationError.style.display = "none";
    mailError.style.display = "none";
    passwordError.style.display = "none";
    aboutError.style.display = "none";
  }
}

function getPersonInformation() {
  let username = document.forms[1].querySelector("#username"),
    mail = document.forms[1].querySelector("#mail"),
    password = document.forms[1].querySelector("#password"),
    select = document.forms[1].querySelector("#select");

  // Error Selectors
  let usernameError = document.querySelector(".name-error"),
    mailError = document.querySelector(".mail-error"),
    passwordError = document.querySelector(".password-error");

  let usernameValid = false,
    mailValid = false,
    passwordValid = false;

  // Username Validation
  if (username.value == "") {
    usernameError.innerHTML = "Username field mustn't be empty";
    usernameError.style.display = "block";
  } else {
    usernameValid = true;
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

  // Password Validation
  const lower = new RegExp("(?=.*[a-z])"),
    upper = new RegExp("(?=.*[A-Z])"),
    number = new RegExp("(?=.*[0-9])"),
    len = new RegExp("(?=.{8,})");

  if (password.value == "") {
    passwordError.innerHTML = "Password field mustn't be empty";
    passwordError.style.display = "block";
  } else if (!lower.test(password.value)) {
    passwordError.innerHTML =
      "Password must contain at least one lowercase character";
    passwordError.style.display = "block";
  } else if (!upper.test(password.value)) {
    passwordError.innerHTML =
      "Password must contain at least one uppercase character";
    passwordError.style.display = "block";
  } else if (!number.test(password.value)) {
    passwordError.innerHTML = "Password must contain at least one number";
    passwordError.style.display = "block";
  } else if (!len.test(password.value)) {
    passwordError.innerHTML = "Password must contain at least 8 character";
    passwordError.style.display = "block";
  } else {
    passwordValid = true;
  }

  // Move To Next Page if Validation is Done
  if (usernameValid && mailValid && passwordValid) {
    // If it's the last slide, reset to 0, else +1
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }
    // Move carousel to updated slide
    moveCarouselTo(slide);

    typeofAccount = "personal";
    addAccountToArray(
      typeofAccount,
      username.value,
      "",
      mail.value,
      password.value,
      select.value
    );

    let infoName = document.querySelector(".info .name span");
    infoName.innerHTML = username.value;
    let infolocation = document.querySelector(".info .location");
    infolocation.style.display = "none";
    let infoMail = document.querySelector(".info .mail span");
    infoMail.innerHTML = mail.value;
    let infoField = document.querySelector(".info .field span");
    infoField.innerHTML = select.value;
  }

  // Hide Errors From Fooooorm
  username.addEventListener("focus", removeErrors);
  mail.addEventListener("focus", removeErrors);
  password.addEventListener("focus", removeErrors);
  function removeErrors() {
    usernameError.style.display = "none";
    mailError.style.display = "none";
    passwordError.style.display = "none";
  }
}

// Go To Personal Page Or Company Page
next.addEventListener("click", function (e) {
  if (e.target == next) {
    let typeofAccount;
    if (company.hasAttribute("checked")) {
      typeofAccount = "company";
    }
    if (personal.hasAttribute("checked")) {
      typeofAccount = "personal";
    }

    let next1 = document.querySelector(".next1");
    let prev1 = document.querySelectorAll(".cancel")[1];
    prev1.addEventListener("click", movePrev);

    if (typeofAccount == "company") {
      // next1.addEventListener("click", moveNext);
      next1.addEventListener("click", getCompanyInformation);
    }
    if (typeofAccount == "personal") {
      // next1.addEventListener("click", moveNext);
      next1.addEventListener("click", getPersonInformation);
    }
    console.log(typeofAccount);
  }
});

// Add Account To Array
function addAccountToArray(
  typeofAccount,
  name,
  location,
  mail,
  password,
  about
) {
  // Account Data
  const account = {
    id: Date.now(),
    type: typeofAccount,
    name: name,
    location: location,
    mail: mail,
    password: password,
    about: about,
    register: false,
  };

  // Add Account To Array
  usersAccounts.push(account);
  console.log(account);

  // Add Account To Local Storage
  addDataToLocalStorageFrom(usersAccounts);
}

function addDataToLocalStorageFrom(usersAccounts) {
  window.localStorage.setItem("account", JSON.stringify(usersAccounts));
}

function makeSerial(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
