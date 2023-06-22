const pageElement = document.getElementById("page");

export const renderSignupForm = () => {
  const pageElement = document.getElementById("page");
  pageElement.innerHTML = signupFormHTML();

  const signupForm = document.getElementById("signupForm");
  const signupSubmitButton = document.getElementById("signupSubmitButton");

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("/api/user", user)
      .then((response) => {
        console.log("User added to database:", response.data);
      })
      .catch((error) => {
        console.error("Error adding user to database:", error);
      });
  });
};
