export const renderFriendsList = () => {
  const page = document.getElementById("page");
  const friendsList = document.createElement("dialog");
  page.appendChild(friendsList);
  friendsList.className = "friendsListDialog";
  friendsList.showModal();

  const friendsListForm = document.createElement("form");
  friendsListForm.innerHTML = `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" >
      <div id="allUsers" style="overflow:scroll; height:400px;"></div>
    `;

  const closeSendMessage = document.createElement("p");
  closeSendMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="closeFriendsList" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  closeSendMessage.addEventListener("click", () => {
    friendsList.close();
    page.removeChild(friendsList);
  });

  friendsList.append(closeSendMessage, friendsListForm);

  axios
    .get("/api/usersFriendsList")
    .then((response) => {
      const allUserInfo = response.data;
      const allUsers = document.getElementById("allUsers");

      if (typeof allUserInfo === "string") {
        allUserInfo = JSON.parse(allUserInfo);
      }

      allUserInfo.username.forEach((username) => {
        const usernameElement = document.createElement("p");
        usernameElement.textContent = username;
        const messageButton = document.createElement("p");
        messageButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="sendFriendMsg" class="sendFriendMsg" viewBox="0 0 16 16">
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
      </svg>`;
        messageButton.addEventListener("click", () => {});
        allUsers.append(usernameElement, messageButton);
      });
    })
    .catch((error) => {
      console.error("Failed to fetch all users:", error);
    });
};
