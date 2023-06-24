export function renderProfile() {
  const page = document.getElementById("page");
  const container = document.createElement("div");
  container.className = "calenderContainer";
  page.replaceChildren(container);

  container.innerHTML = `
  <div id="calendar-body">
  <div class="wrapper">
  <div id="calendar-Header">
  <p class="current-date"></p>
  <div class="icons">
    <span id="prev"><</span>
    <span id="next">></span>
  </div>
</div>
<div class="calendar">
  <ul class="weeks">
    <li>Sun</li>
    <li>Mon</li>
    <li>Tue</li>
    <li>Wed</li>
    <li>Thu</li>
    <li>Fri</li>
    <li>Sat</li>
  </ul>
  <ul class="days"></ul>
</div>
    </div>
    </div>
  `
  const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
  
  let date = new Date(),
  currentYear = date.getFullYear(),
  currentMonth = date.getMonth();
  
  
  const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
  
  const renderCalendar = () => {
      let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(), 
      lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), 
      lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(), 
      lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate(); 
      let liTag = "";
  
      for (let i = firstDayofMonth; i > 0; i--) { 
          liTag += `<li ">${lastDateofLastMonth - i + 1}</li>`;
      }
  
      for (let i = 1; i <= lastDateofMonth; i++) { 
          let isToday = i === date.getDate() && currentMonth === new Date().getMonth() 
                       && currentYear === new Date().getFullYear() ? "active" : "";
          liTag += `<li class="${isToday}">${i}</li>`;
      }
  
      for (let i = lastDayofMonth; i < 6; i++) { 
          liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
      }
      currentDate.innerText = `${months[currentMonth]} ${currentYear}`; 
      daysTag.innerHTML = liTag;
  }
  renderCalendar();
  
  prevNextIcon.forEach(icon => { 
      icon.addEventListener("click", () => { 
        
          currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
  
          if(currentMonth < 0 || currentMonth > 11) {
              
              date = new Date(currentYear, currentMonth, new Date().getDate());
              currentYear = date.getFullYear(); 
              currentMonth = date.getMonth(); 
          } else {
              date = new Date();
          }
          renderCalendar(); 
      });
  });


}
