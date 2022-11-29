// Copy Arrays From Local Storage
let data = window.localStorage.getItem("job");
let data2 = window.localStorage.getItem("apply");

let copyJobs = JSON.parse(localStorage.getItem("job"));
let copyAccounts = JSON.parse(localStorage.getItem("account"));
let copyApply = JSON.parse(localStorage.getItem("apply"));

let post = document.querySelector("button.post");
post.addEventListener("click", function (e) {
  open("post.html", "_self");
  e.preventDefault();
});

let profile = document.querySelector(".fa-user-circle");
profile.addEventListener("click", function () {
  let copyAccounts = JSON.parse(localStorage.getItem("account"));
  for (let i = 0; i < copyAccounts.length; i++) {
    if (copyAccounts[i].register == true) {
      window.localStorage.setItem(
        "special",
        JSON.stringify(copyAccounts[i].id)
      );
    }
  }
  open("profile1.html", "_self");
});

// For Display Header Form
let bars = document.querySelector(".fa-bars");
let times = document.querySelector(".fa-times");
let form = document.forms[0];

bars.addEventListener("click", function () {
  form.style.display = "block";
});

times.addEventListener("click", function () {
  form.style.display = "none";
});

document.body.onresize = function () {
  if (document.body.clientWidth >= 768) {
    form.style.display = "flex";
  } else {
    form.style.display = "none";
  }
};

// ================================================================================
// ============ Add Jobs To Page From Local Storage ===============================
// ================================================================================

let divJobs = document.createElement("div");
divJobs.className = "jobs";
let divContainer = document.createElement("div");
divContainer.className = "container";

let header = document.getElementsByTagName("header")[0];
header.after(divJobs);

divJobs.appendChild(divContainer);
if (!data) {
  let img = document.createElement("img");
  img.setAttribute("src", "images/no-content.webp");
  img.style.width = "100% ";
  divContainer.append(document.createTextNode("No Jobs Here Yet"));
  divContainer.appendChild(img);
} else {
  for (let i = 0; i < copyJobs.length; i++) {
    createJobe(
      copyJobs[i].country,
      copyJobs[i].feild,
      copyJobs[i].hours,
      copyJobs[i].time,
      copyJobs[i].description,
      copyJobs[i].id,
      copyJobs[i].name
    );
  }
}

function createJobe(country, feild, hours, time, description, id, name) {
  // Create Main Elements
  let divJob = document.createElement("div");
  divJob.className = "job";
  let divJobContent = document.createElement("div");
  divJobContent.className = "job-content";
  divJobContent.setAttribute("title", "Show Applicants");
  let divRemotly = document.createElement("div");
  divRemotly.className = "remotly";

  let spanAvatar = document.createElement("span");
  spanAvatar.className = "avatar";
  let spanJobHours = document.createElement("span");
  spanJobHours.className = "job-hours";
  let JobDescription = document.createElement("p");
  JobDescription.className = "job-descrption";

  let p = document.createElement("p");
  let pCompanyName = document.createElement("p");
  pCompanyName.className = "company-name";

  let h2 = document.createElement("h2");
  h2.classList = "heading";
  h2.setAttribute("special", id);
  let button = document.createElement("button");
  button.className = "btn";
  button.setAttribute("special", id);

  // Append Elements
  divContainer.appendChild(divJob);
  divJob.appendChild(spanAvatar);
  spanAvatar.append(document.createTextNode(name[0].toUpperCase()));
  divJob.appendChild(divJobContent);
  divJob.appendChild(divRemotly);

  divJobContent.appendChild(pCompanyName);
  pCompanyName.append(document.createTextNode(name));
  divJobContent.appendChild(h2);
  h2.append(document.createTextNode(feild));
  divJobContent.appendChild(spanJobHours);
  spanJobHours.append(document.createTextNode(`${hours}Hours / ${country}`));

  divJobContent.appendChild(JobDescription);
  JobDescription.append(document.createTextNode(description));

  divRemotly.appendChild(p);
  p.append(document.createTextNode(time));
  divRemotly.appendChild(button);
  button.append(document.createTextNode("Apply Now"));
}

// Check The Account if Personal or Company for Login to Jobs Page
for (let k = 0; k < copyAccounts.length; k++) {
  if (copyAccounts[k].register == true) {
    // console.log(copyAccounts[k].register);
    if (copyAccounts[k].type == "personal") {
      post.style.display = "none";
      // console.log("This is personal account");
    } else if (copyAccounts[k].type == "company") {
      profile.style.display = "none";
      // console.log("This is company account");
    }
  }
}

// For Store Job Id
divJobs.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    // console.log(e.target.getAttribute("special"));
    window.localStorage.setItem(
      "special",
      JSON.stringify(e.target.getAttribute("special"))
    );
    open("apply.html", "_self");
  }

  if (e.target.classList.contains("heading")) {
    for (let k = 0; k < copyAccounts.length; k++) {
      if (copyAccounts[k].register == true) {
        if (copyAccounts[k].type == "personal") {
          divJobs.removeEventListener("click", showApplicants);
        } else if (copyAccounts[k].type == "company") {
          if (copyAccounts[k].name == e.target.previousSibling.innerHTML) {
            showApplicants(e.target.getAttribute("special"));
          } else {
            divJobs.removeEventListener("click", showApplicants);
          }
        }
      }
    }
  }
});

let overlay = document.createElement("div");
overlay.classList = "overlay";
let dialog = document.createElement("div");
overlay.append(dialog);
dialog.classList = "dialog";
divJobs.after(overlay);

function showApplicants(param) {
  dialog.innerHTML = "";
  overlay.style.display = "block";
  dialog.style.display = "block";
  dialog.style.background = "#eee";
  let icon = document.createElement("i");
  icon.classList = "fas fa-times";

  dialog.append(icon);

  let c = 0;

  if (data || copyApply.length != 0) {
    for (let i = 0; i < copyApply.length; i++) {
      if (copyApply[i].special == param) {
        // console.log(copyApply[i].username);

        let applicant = document.createElement("div");
        applicant.classList = "applicant";
        let h3 = document.createElement("h3");
        h3.classList = "show-profile";
        h3.style.cursor = "pointer";
        h3.setAttribute("whoApply", copyApply[i].whoApply);
        h3.setAttribute("id", copyApply[i].id);
        h3.append(copyApply[i].username);
        let rejectAccept = document.createElement("div");
        rejectAccept.classList = "reject-accept";
        let button1 = document.createElement("button");
        button1.classList = "reject";
        button1.setAttribute("id", copyApply[i].id);

        button1.append(document.createTextNode("Reject"));
        let button2 = document.createElement("button");
        button2.classList = "accept";
        button2.append(document.createTextNode("Accept"));

        rejectAccept.appendChild(button1);
        rejectAccept.appendChild(button2);

        applicant.appendChild(h3);
        applicant.appendChild(rejectAccept);

        dialog.append(applicant);
      } else {
        c++;
        if (c == copyApply.length) {
          let img = document.createElement("img");
          img.setAttribute("src", "images/no-content.webp");
          dialog.append(img);
          dialog.append(document.createTextNode("No Body Applied Yet"));
          img.style.width = "100%";
          dialog.style.background = "#fff";
        }
      }
    }
  } else {
    let img = document.createElement("img");
    img.setAttribute("src", "images/no-content.webp");
    dialog.append(img);
    dialog.append(document.createTextNode("No Body Applied Yet"));
    img.style.width = "100%";
    dialog.style.background = "#fff";
  }

  let hideDialog = document.querySelector(".dialog > i");
  hideDialog.addEventListener("click", function () {
    overlay.style.display = "none";
    dialog.style.display = "none";
  });

  dialog.addEventListener("click", function (e) {
    if (e.target.classList.contains("show-profile")) {
      showProfile(e.target.getAttribute("id"));
    }

    if (e.target.classList.contains("reject")) {
      let rejected = e.target.getAttribute("id");
      for (let j = 0; j < copyApply.length; j++) {
        if (copyApply[j].id == rejected) {
          // console.log("Found");
          copyApply = copyApply.filter((apply) => apply.id != rejected);
          window.localStorage.setItem("apply", JSON.stringify(copyApply));
          location.reload();
        }
      }
    }
  });
}

function showProfile(param) {
  // console.log(param);
  for (let i = 0; i < copyApply.length; i++) {
    if (param == copyApply[i].id) {
      window.localStorage.setItem("special", param);
    }
  }
  open("profile.html", "_self");
}

// =============================================================================
// ================= Filter ====================================================
// =============================================================================
let btn = document.querySelector(".transparent-btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
});

let search = document.querySelector("#search");
let place = document.querySelector("#location");

let moreEight = document.querySelector("#more");
let eight = document.querySelector("#eight");
let seven = document.querySelector("#seven");
let six = document.querySelector("#six");
let lessSix = document.querySelector("#less");

let searchBtn = document.querySelector(".btn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  divContainer.innerHTML = "";
  if (search.value != "") {
    divContainer.appendChild(document.createTextNode("Keyword"));
    for (let i = 0; i < copyJobs.length; i++) {
      if (
        copyJobs[i].feild.includes(search.value) ||
        copyJobs[i].description.includes(search.value)
      ) {
        // divContainer.innerHTML = "";
        createJobe(
          copyJobs[i].country,
          copyJobs[i].feild,
          copyJobs[i].hours,
          copyJobs[i].time,
          copyJobs[i].description,
          copyJobs[i].id,
          copyJobs[i].name
        );
      }
    }
  }
  if (place.value != "") {
    let text = document.createTextNode("Country");
    divContainer.appendChild(text);
    for (let i = 0; i < copyJobs.length; i++) {
      if (copyJobs[i].country.includes(place.value)) {
        // divContainer.innerHTML = "";
        createJobe(
          copyJobs[i].country,
          copyJobs[i].feild,
          copyJobs[i].hours,
          copyJobs[i].time,
          copyJobs[i].description,
          copyJobs[i].id,
          copyJobs[i].name
        );
      }
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});

moreEight.addEventListener("click", function () {
  divContainer.innerHTML = "";
  for (let i = 0; i < copyJobs.length; i++) {
    if (copyJobs[i].hours > 8) {
      // console.log(copyJobs[i].hours);
      createJobe(
        copyJobs[i].country,
        copyJobs[i].feild,
        copyJobs[i].hours,
        copyJobs[i].time,
        copyJobs[i].description,
        copyJobs[i].id,
        copyJobs[i].name
      );
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});
eight.addEventListener("click", function () {
  divContainer.innerHTML = "";
  for (let i = 0; i < copyJobs.length; i++) {
    if (copyJobs[i].hours == 8) {
      // console.log(copyJobs[i].hours);
      createJobe(
        copyJobs[i].country,
        copyJobs[i].feild,
        copyJobs[i].hours,
        copyJobs[i].time,
        copyJobs[i].description,
        copyJobs[i].id,
        copyJobs[i].name
      );
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});
seven.addEventListener("click", function () {
  divContainer.innerHTML = "";
  for (let i = 0; i < copyJobs.length; i++) {
    if (copyJobs[i].hours == 7) {
      // console.log(copyJobs[i].hours);
      createJobe(
        copyJobs[i].country,
        copyJobs[i].feild,
        copyJobs[i].hours,
        copyJobs[i].time,
        copyJobs[i].description,
        copyJobs[i].id,
        copyJobs[i].name
      );
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});
six.addEventListener("click", function () {
  divContainer.innerHTML = "";
  for (let i = 0; i < copyJobs.length; i++) {
    if (copyJobs[i].hours == 6) {
      // console.log(copyJobs[i].hours);
      createJobe(
        copyJobs[i].country,
        copyJobs[i].feild,
        copyJobs[i].hours,
        copyJobs[i].time,
        copyJobs[i].description,
        copyJobs[i].id,
        copyJobs[i].name
      );
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});
lessSix.addEventListener("click", function () {
  divContainer.innerHTML = "";
  for (let i = 0; i < copyJobs.length; i++) {
    if (copyJobs[i].hours < 6) {
      // console.log(copyJobs[i].hours);
      createJobe(
        copyJobs[i].country,
        copyJobs[i].feild,
        copyJobs[i].hours,
        copyJobs[i].time,
        copyJobs[i].description,
        copyJobs[i].id,
        copyJobs[i].name
      );
    }
  }
  if (divContainer.innerHTML == "") {
    noResult();
  }
});

function noResult() {
  let img = document.createElement("img");
  img.setAttribute("src", "images/no-result.webp");
  img.style.cssText = "display: block; width:80%; margin: 0 auto";
  divContainer.appendChild(img);
}
