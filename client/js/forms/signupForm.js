const signupFormHTML = () => {
   return `<form action="/api/user" method="post>
   <lable for="username">Username:</lable>
   <input type="text" name="username" id="username"/>

   ` 
}

module.exports = {signupFormHTML}