const pageElement = document.getElementById("page");

export const renderSignupForm = () => {
  axios.get("/api/signup")
    .then((response) => {
      pageElement.innerHTML = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
