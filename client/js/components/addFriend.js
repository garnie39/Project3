

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
          const errorMsg = document.createElement("p")
          errorMsg.textContent = ''
          addFriendButton.addEventListener("click", (event)=>{
            event.preventDefault()
            axios.post("/api/addFriend",{username: username})
            .then((response)=>{
              errorMsg.textContent = "user added"
              setTimeout(()=>{errorMsg.textContent = ""},2000)
              
              console.log("user add as friend")
            })
            .catch((error)=>{
              const err = error.response.data.error
              errorMsg.textContent = err
              setTimeout(()=>{errorMsg.textContent = ""},2000)
             
            })
          })
          
          allUsers.appendChild(usernameElement);
          usernameElement.appendChild(addFriendButton)
          usernameElement.appendChild(errorMsg)
          
        });
      })
      .catch((error) => {
        console.error("Failed to fetch all users:", error);
      });
  };
  