import { renderAddEvent } from "./addEvent.js";
import { renderLogout } from "./logout.js";

export function renderHeader() {
  let name;
  axios
    .get("/api/login")
    .then((res) => {
      name = res.data.username;
      console.log(name);
      setHeaderHTML(name);
      setSideBar();
    })
    .catch((error) => {
      setHeaderHTML(undefined);
    });
}

function setHeaderHTML(name) {
  const header = document.getElementById("header");
  header.innerHTML = `
      <h1>Welcome</h1>
      <ul id="navList">
            <li id="name">${name}!</li>
            <li id="notification">Notification</li>
            <li id="addFriends">Add Friend</li>
            <li id="logout">Log Out</li>
      </ul>
      `;

  // document
  //   .getElementById("notification")
  //   .addEventListener("click", () => renderNotifacation());

  // document
  //   .getElementById("friendsList")
  //   .addEventListener("click", () => renderAddFriends());

  document
    .getElementById("logout")
    .addEventListener("click", () => renderLogout());
}

function setSideBar() {
  const sideBar = document.getElementById("side_bar");
  sideBar.innerHTML = `
    <ul id="sideNavList>
      <li id="selectMonth">Select Month</li>
      <li id="friendsList">Friend</li>
      <li id="addEvents">Add Event</li>
    </ul>
      `;

  // document
  //   .getElementById("selectMonth")
  //   .addEventListener("click", () => renderMonth());

  // document
  //   .getElementById("friendsList")
  //   .addEventListener("click", () => renderFriendsList());

  document
    .getElementById("addEvents")
    .addEventListener("click", () => renderAddEvent());
}
