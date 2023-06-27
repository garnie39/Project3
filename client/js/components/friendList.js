

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
  const friends = response.data.friends;
  const allUsers = document.getElementById("allUsers");

  friends.forEach((friend) => {
    const usernameElement = document.createElement("p");
    usernameElement.textContent = friend;
    const messageButton = document.createElement("button");
    messageButton.textContent = "Send message";
    messageButton.addEventListener("click", (event) => {
      event.preventDefault()
      const sendMessageDialog = document.createElement("dialog");
      page.appendChild(sendMessageDialog);
      sendMessageDialog.showModal();

      const sendMessage = document.createElement("form");
      sendMessage.innerHTML = `
      <h4>${friend}</h4>
      <div id="messageList" style="overflow:scroll; height:400px;"></div>
      <input type="text" id="sendMessageTextInput"> <input type="submit" value="Send">
      `
      sendMessageDialog.appendChild(sendMessage)
        sendMessage.addEventListener("submit",(event)=>{

          event.preventDefault();
          const sendMessageTextInput = sendMessage.querySelector("#sendMessageTextInput").value;
          console.log(sendMessageTextInput)
          axios.post("/api/message",{friend: friend, sendMessageTextInput: sendMessageTextInput})
          sendMessage.querySelector("#sendMessageTextInput").value = ""
        })
        });

        
        setInterval(() => {
          axios.get(`/api/getMessages`).then((response) => {
            const messageList = document.getElementById("messageList");
            const messages = response.data.message;
            messageList.innerHTML = '';
  
            messages.forEach((message) => {
              const messageTextBox = document.createElement("p");
              messageTextBox.textContent = message;
              messageList.prepend(messageTextBox);
            });
          });
        }, 2000); 
      

      allUsers.appendChild(usernameElement);
      usernameElement.appendChild(messageButton);
    });
  })
.catch((error) => {
  console.error("Failed to fetch user's friends:", error);
});
};

