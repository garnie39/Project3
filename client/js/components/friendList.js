export const renderFriendsList = () =>{ 
    const page = document.getElementById("page");
    const friendsList = document.createElement("dialog");
    page.appendChild(friendsList);
    friendsList.showModal();
  
    const friendsListForm = document.createElement("form");
    friendsListForm.innerHTML = `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" >
      <div id="allUsers" style="overflow:scroll; height:400px;"></div>

    `;
    friendsList.appendChild(friendsListForm);

axios.get("/api/usersFriendsList")
.then((response) => {
    const allUserInfo = response.data;
    const allUsers = document.getElementById("allUsers");
    
    if (typeof allUserInfo === "string") {
      allUserInfo = JSON.parse(allUserInfo);
    }

    allUserInfo.username.forEach((username) => {
      const usernameElement = document.createElement("p");
      usernameElement.textContent = username;
      const messageButton = document.createElement("button")
      messageButton.textContent = "send msg"
      messageButton.addEventListener("click", ()=>{
        
      })
      allUsers.appendChild(usernameElement);
      usernameElement.appendChild(messageButton)
    });
  })
  .catch((error) => {
    console.error("Failed to fetch all users:", error);
  });

}