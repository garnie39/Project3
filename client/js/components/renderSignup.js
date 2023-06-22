import { signup } from "../../controllers/signup";

export const renderSignupForm = () => {
  const pageElement = document.getElementById("page");
  const form = document.createElement('form')
  const div = document.documentCreate('div')
  form.className('signupForm')
  form.innerHTML = `<form action="/api/user" method="post">
  <label for="username">Username:</label>
  <input type="text" name="username" id="username"/>
  <label for="email">Email:</label>
  <input type="email" name="email" id="email"/>
  <label for="password">Password:</label>
  <input type="text" name="password" id="password"/>
  <input type="submit">
  </form>`

  const signupDialog = document.createElement('dialog')
  signupDialog.className = ('signupDialog')
  pageElement.appendChild = signupDialog
  signupDialog.showModal()

  const closeDialogSignup = document.createElement("p");
  closeDialog.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="closeBtn" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  closeDialogSignup.addEventListener("click", () => {
    signupDialog.close();
    page.removeChild(signupDialog);
  });

signupDialog.append(form, closeDialogSignup)

form.addEventListener('submit', (event) => {event.preventDefault()
const formData = new FormData(form)

  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  } 

  axios
  .post("/api/user", user)
  .then((response) => {
    console.log("User added to database:", response.data);
  })
  .catch((error) => {
    console.error("Error adding user to database:", error);
});})}

  