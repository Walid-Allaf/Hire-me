let close = document.querySelector(".cancel");
close.addEventListener("click", function () {
  window.history.back();
});

let select = document.querySelector("#select"),
  hours = document.querySelector("#hours"),
  country = document.querySelector("#country"),
  description = document.querySelector("#description"),
  continu = document.querySelector("input.continue"),
  hoursError = document.querySelector(".hours-error"),
  countryError = document.querySelector(".country-error"),
  descriptionError = document.querySelector(".description-error");

let jobs = [];
if (localStorage.getItem("job")) {
  jobs = JSON.parse(localStorage.getItem("job"));
}

// Foooooorm Validationnnnnnn
document.forms[0].onsubmit = function (e) {
  let hoursValid = false,
    countryValid = false,
    descriptionValid = false;

  // Validation For Working Hours Field
  if (hours.value < 0) {
    hoursError.innerHTML = "Working hours mustn't be negative";
    hoursError.style.display = "block";
  } else if (hours.value == 0) {
    hoursError.innerHTML = "Working hours mustn't be empty or zero";
    hoursError.style.display = "block";
  } else {
    hoursValid = true;
  }

  // Validation For Country Field
  if (country.value == 0) {
    countryError.innerHTML = "Country field mustn't be empty";
    countryError.style.display = "block";
  } else {
    countryValid = true;
  }

  // Validation For Description Field
  if (description.value.length > 200) {
    descriptionError.innerHTML =
      "Job description mustn't be over than 200 character";
    descriptionError.style.display = "block";
  } else if (description.value == 0) {
    descriptionError.innerHTML = "Job description mustn't be empty";
    descriptionError.style.display = "block";
  } else {
    descriptionValid = true;
  }

  // No Submit
  if (
    hoursValid === false ||
    countryValid === false ||
    descriptionValid === false
  ) {
    e.preventDefault();
  }

  // Submit And Show Popup
  if (
    hoursValid === true &&
    countryValid === true &&
    descriptionValid === true
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

    // Add Job To Local Storage
    let companyName;
    let copyAccounts = JSON.parse(localStorage.getItem("account"));
    for (let i = 0; i < copyAccounts.length; i++) {
      if (copyAccounts[i].register == true) {
        companyName = copyAccounts[i].name;
      }
    }
    addJobToArray(
      select.value,
      hours.value,
      country.value,
      description.value,
      companyName
    );
  }

  // Hide Errors From Fooooorm
  hours.addEventListener("focus", removeErrors);
  country.addEventListener("focus", removeErrors);
  description.addEventListener("focus", removeErrors);
  function removeErrors() {
    hoursError.style.display = "none";
    countryError.style.display = "none";
    descriptionError.style.display = "none";
  }
};

function addJobToArray(feild, hours, country, description, companyName) {
  // Job Data
  const job = {
    id: new Date().getTime(),
    time: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
    feild: feild,
    hours: hours,
    country: country,
    description: description,
    name: companyName,
  };
  console.log("Job Added");

  // Add job To Array
  jobs.push(job);
  console.log(job);

  // Add job To Local Storage
  addDataToLocalStorageFrom(jobs);
}

function addDataToLocalStorageFrom(jobs) {
  window.localStorage.setItem("job", JSON.stringify(jobs));
}
