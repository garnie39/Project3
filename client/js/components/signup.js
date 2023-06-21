function signUpForm() {
    const page = document.getElementById('page')
    const heading = document.createElement('h1')
    heading.textContent = 'Sign Up'
    const form = document.createElement('form')
    form.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" name="name">
    <label for="email">Email: </label>
    <input type="email" name="email">
    <label for="password">Password: </label>
    <input type="password" name="password">
    <input type="submit">
`
    page.appendChild(heading)
    page.appendChild(form)
}

console.log('sign up form working');