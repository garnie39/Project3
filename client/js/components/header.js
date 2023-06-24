import { renderAddEvent } from "./addEvent.js";
import { renderLogout } from "./logout.js";

export function renderHeader() {
  let name;
  axios
    .get("/api/login")
    .then((res) => {
      name = res.data.username;
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
    <ul id="navList">
      <h1 id="welcome"><svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" fill="currentColor" class="logo" viewBox="0 0 16 16">
      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5Zm-2 4v-1c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5Zm6 3.493c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
      </svg> Welcome ${name}!</h1>
      <li id="space"></li>
      <li><svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill="currentColor" class="notification" viewBox="0 0 16 16">
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
    </svg></li>
      <li><svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill="currentColor" class="addFriends" viewBox="0 0 16 16">
      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
    </svg></li>
      <li><svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill="currentColor" class="logout" viewBox="0 0 16 16">
      <path d="M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z"/>
      <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z"/>
    </svg></li>
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
    <ul id="sideNavList">
      <li><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="aliceblue" class="friendsList" viewBox="0 0 16 16">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    </svg></li>
      <li><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="aliceblue" class="addEvent" viewBox="0 0 16 16">
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
    </svg></li>
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
