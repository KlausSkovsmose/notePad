var loginForm = document.getElementById("login");
var registerUserForm = document.querySelector(".register-form");
var createNoteForm = document.querySelector(".form-wrap");
var navigateToCreateUser = document.querySelector(".UserCreate-btn");

// Navigate to create user
if (navigateToCreateUser) {
  navigateToCreateUser.addEventListener(
    "click",
    () => (window.location.href = "createUser.html")
  );
}

// Login

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    var email = loginForm.elements["email"].value;
    var password = loginForm.elements["password"].value;

    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.status == 400) return;
        return res.text();
      })
      .then((data) => {
        if (typeof data == "string") {
          localStorage.setItem("userToken", data);
          window.location.href = "note.html";
        }
      })
      .catch((error) => console.log(error.response.data));
  });
}

// Create user

if (registerUserForm) {
  registerUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = registerUserForm.elements["name"].value;
    let email = registerUserForm.elements["email"].value;
    let password = registerUserForm.elements["password"].value;

    console.log(email, password, name);

    fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.status == 400) return;
        console.log(res.status);
        return res.text();
      })
      .then((data) => {
        if (data) {
          window.location.href = "index.html";
        }
      })
      .catch((error) => console.log(error.response.data));
  });
}

// Create Note
if (createNoteForm) {
  createNoteForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    var title = createNoteForm.elements["title"].value;
    var description = createNoteForm.elements["desc"].value;

    fetch("http://localhost:3000/api/notes", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("userToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => location.reload())
      .catch((error) => console.log(error));
  });
}

// fetch all notes by a user
function fetchNotesByUser() {
  fetch("http://localhost:3000/api/notes", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": localStorage.getItem("userToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => {
      return res.json();
    })
    .then((notes) => {
      const notesList = document.getElementById("note-list");
      notes.forEach((data) => {
        const row = document.createElement("tr");

        row.setAttribute("key", data._id);
        const titleTD = document.createElement("td");
        titleTD.textContent = data.title;
        const descriptionTD = document.createElement("td");
        descriptionTD.textContent = data.description;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteNote(data._id));
        row.appendChild(titleTD);
        row.appendChild(descriptionTD);
        row.appendChild(deleteButton);

        notesList.appendChild(row);
        //location.reload();
      });
    });
}

document.addEventListener("DOMContentLoaded", () => fetchNotesByUser());

function deleteNote(id) {
  fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": localStorage.getItem("userToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(() => {
      let row = document.querySelector(`[key="${id}"]`);
      row.parentNode.removeChild(row);
  })
}
