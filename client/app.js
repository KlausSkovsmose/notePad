var loginForm = document.getElementById("login");
var registerUserForm = document.querySelector(".register-form");
var createNoteForm = document.querySelector(".form-wrap");
var navigateToCreateUser = document.querySelector(".UserCreate-btn");
var returnToLogin = document.getElementById("returnbtn");
let updateId = null;

// Navigate to create user
if (navigateToCreateUser) {
  navigateToCreateUser.addEventListener(
    "click",
    () => (window.location.href = "createUser.html")
  );
}

// Return to login page
if (returnToLogin) {
  returnToLogin.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
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
  registerUserForm.addEventListener("submit", async function (e) {
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
  createNoteForm.addEventListener("submit", (e) => {
    createNewNote(e);
  });
}

function createNewNote(e) {
  e.preventDefault();
  let url = ``;
  let method = "";
  if (updateId) {
    method = "PATCH";
    url = `http://localhost:3000/api/notes/${updateId}`;
  } else {
    url = "http://localhost:3000/api/notes/";
    method = "POST";
  }

  var title = createNoteForm.elements["title"].value;
  var description = createNoteForm.elements["desc"].value;

  fetch(url, {
    method: method,
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
    .then((data) => {
      if (data) {
        const notesList = document.getElementById("note-list");

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
        location.reload();
      }
    })
    .catch((error) => console.log(error));
}

// gives error on login page
document.addEventListener("DOMContentLoaded", () => fetchNotesByUser());

// fetch all notes by a user
function fetchNotesByUser() {
  fetch("http://localhost:3000/api/notes/", {
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
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => updateNote(data._id));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteNote(data._id));
        row.appendChild(titleTD);
        row.appendChild(descriptionTD);
        row.appendChild(updateButton);
        row.appendChild(deleteButton);

        notesList.appendChild(row);
      });
    });
}

// Delete note
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
  });
}

// Update Note

function updateNote(id) {
  let row = document.querySelector(`[key="${id}"]`);
  let title = row.cells[0].textContent;
  let description = row.cells[1].textContent;
  createNoteForm.elements["title"].value = title;
  createNoteForm.elements["desc"].value = description;
  document.getElementById("createNote").value = "Update Note";
  updateId = id;
}
