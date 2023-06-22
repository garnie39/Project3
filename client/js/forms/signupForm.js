const signupFormHTML = () => {
  return `
    <form id="signupForm">
      <label for="name">Name:</label>
      <input type="text" name="name">
      <label for="email">Email: </label>
      <input type="email" name="email">
      <label for="password">Password: </label>
      <input type="password" name="password">
      <input type="submit" id="signupSubmitButton">
    </form>
  `;
};

module.exports = { signupFormHTML };
