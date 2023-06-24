import { renderFrontPage } from "./frontPage.js";

export function renderLogout() {
  
  axios.delete("/api/login").then((_) => {
    const header = document.getElementById("header");
    const side_bar = document.getElementById("side_bar");
    header.innerHTML = "";
    side_bar.innerHTML = "";
    renderFrontPage();
  });
}
