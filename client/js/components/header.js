// export function renderHeader() {
//     let name;
//     axios.get('/api/session').then(response => {
//         name = response.data.name;
//         setHeaderHTML(name);
//     }).catch((error) => {
//         setHeaderHTML(undefined);
//     })
// }

function setHeaderHtml(name) {
    const header = document.getElementById('header');
    header.innerHTML = `
      <h1>Welcome</h1>
      <ul id="navList">
        ${name ? `<li>Hello ${name}!</li><li id="addEvent">Add Event</li><li id="logout">Logout</li>` : ''}
      </ul>`;
  }
  
  