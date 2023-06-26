export const renderAddFriends = () => {
  const page = document.getElementById("page");
  const addFriendDialog = document.createElement("dialog");
  addFriendDialog.className = "addFriendDialog";
  page.appendChild(addFriendDialog);
  addFriendDialog.showModal();

  const addFriendForm = document.createElement("form");
  addFriendForm.innerHTML = `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" >
      <div id="allUsers" style="overflow:scroll; height:400px;"></div>
    `;

  const closeAddFriendDialog = document.createElement("p");
  closeAddFriendDialog.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="closeAddFriendBtn" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  closeAddFriendDialog.addEventListener("click", () => {
    addFriendDialog.close();
    page.removeChild(addFriendDialog);
  });

  addFriendDialog.append(closeAddFriendDialog, addFriendForm);

  axios
    .get("/api/allUsers")
    .then((response) => {
      const allUserInfo = response.data;
      const allUsers = document.getElementById("allUsers");

      if (typeof allUserInfo === "string") {
        allUserInfo = JSON.parse(allUserInfo);
      }

      allUserInfo.username.forEach((username) => {
        const usernameElement = document.createElement("p");
        const addFriendButton = document.createElement("p");
        addFriendButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="addFriendBtn" class="addFriendBtn" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/></svg>`;

        usernameElement.innerHTML = username;

        allUsers.append(usernameElement, addFriendButton);

        addFriendButton.addEventListener("click", () => {});
      });
    })
    .catch((error) => {
      console.error("Failed to fetch all users:", error);
    });
};
