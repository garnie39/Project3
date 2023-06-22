const signupFormHTML = () => {
   return `<form action="/api/user" method="post">
   <label for="username">Username:</label>
   <input type="text" name="username" id="username"/>
   <label for="email">Email:</label>
   <input type="email" name="email" id="email"/>
   <label for="password">Password:</label>
   <input type="text" name="password" id="password"/>
   <input type="submit">
   </form>`;
}

module.exports = {signupFormHTML}
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
