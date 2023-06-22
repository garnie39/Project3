import { renderSignupForm } from "./renderSignup.js";
import { renderLogin } from "./renderLogin.js";
export function renderFrontPage() {
  const page = document.getElementById("page");

  const div = document.createElement("div");
  div.className = "frontPage";
  const logo = document.createElement("p");
  logo.className = "logo";

  logo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-heart-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5Zm-2 4v-1c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5Zm6 3.493c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
  </svg>`;

  const div2 = document.createElement("div");
  div2.className = "button";

  const signupBtn = document.createElement("button");
  signupBtn.className = "signupBtn";
  signupBtn.textContent = " signUp" 
  const loginBtn = document.createElement("button");
  loginBtn.className = "loginBtn";
  loginBtn.textContent = "login"

  signupBtn.addEventListener("click", () => renderSignupForm()); //name for sign up function
  loginBtn.addEventListener("click", () => renderLogin()); //name for log in function

  div2.append(signupBtn, loginBtn);
  div.append(logo, div2);
  page.appendChild(div);
}
