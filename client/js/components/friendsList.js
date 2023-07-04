export const renderFriendsList = () => {
  const page = document.getElementById("page");
  const friendsList = document.createElement("dialog");
  friendsList.className = "friendsListDialog";
  page.appendChild(friendsList);
  friendsList.showModal();

  const friendsListForm = document.createElement("form");
  friendsListForm.innerHTML = `
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" >
      <div id="allUsers" style="overflow:scroll; height:400px;"></div>
    `;

  const closeFriendsList = document.createElement("p");
  closeFriendsList.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeFriendsList" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`;

  closeFriendsList.addEventListener("click", () => {
    friendsList.close();
    page.removeChild(friendsList);
  });

  friendsList.append(friendsListForm, closeFriendsList);

  axios
    .get("/api/usersFriendsList")
    .then((response) => {
      const friends = response.data.friends;
      const allUsers = document.getElementById("allUsers");

      friends.forEach((friend) => {
        const usernameElement = document.createElement("p");
        usernameElement.textContent = friend;
        const messageButton = document.createElement("p");
        messageButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="messageSend" viewBox="0 0 16 16">
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>`;

        messageButton.addEventListener("click", (event) => {
          event.preventDefault();
          const sendMessageDialog = document.createElement("dialog");
          friendsList.appendChild(sendMessageDialog);
          sendMessageDialog.className = "chatBox";
          sendMessageDialog.showModal();

          const sendMessage = document.createElement("form");
          sendMessage.innerHTML = `
            <h4 class="friend">${friend}</h4>
            <div id="messageList" style="overflow:scroll; height:500px;"></div>
            <input type="text" id="sendMessageTextInput">
            <input type="submit" id="submitChat" value="Send">
          `;
          const closeChat = document.createElement("p");
          closeChat.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeChat" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>`;
          closeChat.addEventListener("click", () => {
            sendMessageDialog.close();
            friendsList.removeChild(sendMessageDialog);
            clearInterval(fetchMessagesInterval)
          });
          sendMessageDialog.append(sendMessage, closeChat);

          sendMessage.addEventListener("submit", (event) => {
            event.preventDefault();
            const sendMessageTextInput = sendMessage.querySelector(
              "#sendMessageTextInput"
            ).value;
            console.log(sendMessageTextInput);
            axios.post("/api/message", {
              friend: friend,
              sendMessageTextInput: sendMessageTextInput,
            });
            sendMessage.querySelector("#sendMessageTextInput").value = "";
          });

          const fetchAndDisplayMessages = () => {
            axios.get(`/api/getMessages?friend=${friend}`).then((response) => {
              const messageList = document.getElementById("messageList");
              const messages = response.data.message;
              const sessionUser = response.data.sessionUsername;
              messageList.innerHTML = "";
              function scrollToBottom() {
                messageList.scrollTop = messageList.scrollHeight;
              }
          
              messages.forEach((message) => {
                const { user, text } = message; 
          
                const messageTextBox = document.createElement("p");
                if(user === sessionUser){
                messageTextBox.textContent = `${text}`;
                messageTextBox.className = "session-user-message"
                messageList.appendChild(messageTextBox);
              }else{
                messageTextBox.textContent = `${text}`;
                messageList.appendChild(messageTextBox)
              }
              });
          
              scrollToBottom();
            });
          };
          

          const fetchMessagesInterval = setInterval(fetchAndDisplayMessages, 2000);
          fetchAndDisplayMessages();

          closeMessageChat.addEventListener("click", () => {
            clearInterval(fetchMessagesInterval);
          });

        });

        allUsers.appendChild(usernameElement);
        usernameElement.appendChild(messageButton);
      });
    })
    .catch((error) => {
      console.error("Failed to fetch user's friends:", error);
    });
};

