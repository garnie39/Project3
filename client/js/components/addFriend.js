export const renderAddFriends = () => {
    const page = document.getElementById("page");
    const addFriendDialog = document.createElement("dialog");
    page.appendChild(addFriendDialog);
    addFriendDialog.showModal();
  
    const addFriendForm = document.createElement("form");
    addFriendForm.innerHTML = `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" >
      <div id="allUsers" style="overflow:scroll; height:400px;"></div>
  
  
    `;
    addFriendDialog.appendChild(addFriendForm);
  
    axios.get("/api/allUsers")
      .then((response) => {
        const allUserInfo = response.data;
        const allUsers = document.getElementById("allUsers");
        
        if (typeof allUserInfo === "string") {
          allUserInfo = JSON.parse(allUserInfo);
        }
  
        allUserInfo.username.forEach((username) => {
          const usernameElement = document.createElement("p");
          usernameElement.textContent = username;
          const addFriendButton = document.createElement("button")
          addFriendButton.textContent = "ADD FRIEND"
          
          allUsers.appendChild(usernameElement);
          usernameElement.appendChild(addFriendButton)
        });
      })
      .catch((error) => {
        console.error("Failed to fetch all users:", error);
      });
  };
  