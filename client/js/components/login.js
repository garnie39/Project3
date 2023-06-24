import { renderProfile } from "./profile.js";
import { renderHeader } from "./header.js";

export const renderLogin = () => {
  const page = document.getElementById("page");
  const loginDialog = document.createElement("dialog");
  loginDialog.className = "loginDialog";
  page.appendChild(loginDialog);
  loginDialog.showModal();

  const loginDialogForm = document.createElement("form");
  loginDialogForm.className = "loginDialogForm";
  loginDialogForm.innerHTML = `
 
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>

      <input id="submitBtn" type="submit">
  
  `;

  const closeDialog = document.createElement("p");
  closeDialog.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="closeBtn" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  closeDialog.addEventListener("click", () => {
    loginDialog.close();
    page.removeChild(loginDialog);
  });

  loginDialog.append(loginDialogForm, closeDialog);

  loginDialogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginDialogForm);

    const userInfo = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    axios.post("/api/login", userInfo).then(() => {
      console.log(userInfo);
      renderHeader();
      renderProfile();
    });
  });
};
