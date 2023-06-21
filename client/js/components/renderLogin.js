import { renderFrontPage } from "./frontPage.js";




export const renderLogin = () => {
    const page = document.getElementById("page");
  const loginDialog = document.createElement("dialog");
  page.appendChild(loginDialog);
  loginDialog.showModal();
  
  const loginDialogForm = document.createElement("form");
  loginDialogForm.innerHTML = `
 
   
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>

      <input type="submit">
  
  `;
  
  const closeDialog = document.createElement("button");
  closeDialog.textContent = "Close";
  closeDialog.addEventListener("click", () => {
    loginDialog.close();
  });
  
  loginDialog.appendChild(loginDialogForm);
  loginDialog.appendChild(closeDialog);
 
 
  loginDialogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginDialogForm);
            
    const userInfo = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    axios.post("/api/login", userInfo).then(() => {
      renderFrontPage()
    });
  });
};


