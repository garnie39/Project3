import { renderFrontPage } from "./frontPage";

export function renderLogout() {
  axios.delete("/login").then((_) => {
    renderFrontPage();
  });
}
