import { renderFrontPage } from "./frontPage.js";

export function renderLogout() {
  
  axios.delete("/api/login").then((_) => {
    renderFrontPage();
  });
}
