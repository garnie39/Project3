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
  <ul class="days" id="days"></ul>
</div>
    </div>
    </div>
  `;
  const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

  let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),
      lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(
        currentYear,
        currentMonth,
        lastDateofMonth
      ).getDay(),
      lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      console.log(currentMonth);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
          ? "active"
          : "n";
      const d = new Date(currentYear, currentMonth, i + 1);
      liTag += `<li class="${isToday}" id="${
        d.toISOString().split("T")[0]
      }">${i}</li>`;
      // date.toISOString().split("T")[0];
      console.log(d.toISOString().split("T")[0]);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    console.log(currentMonth);
    daysTag.innerHTML = liTag;

    axios.get("/api/login").then((res) => {
      let user = res.data.username;

      axios.get("/api/events").then((response) => {
        const events = response.data;
        const showEvents = events
          .map((event) => {
            if (
              event.username == user ||
              event.userJoin == user ||
              event.invite == user
            ) {
              return event;
            }
          })
          .filter(Boolean);
        console.log(showEvents);
        for (let e of showEvents) {
          const dateToMatch = e.startDate || e.startdate;
          console.log(dateToMatch);
          const abc = document.getElementById(`${dateToMatch}`);
          if (abc) {
            const pEvent = document.createElement("p");
            if (e.username == user) {
              pEvent.className = "eventList";
            } else {
              pEvent.className = "someoneEventList";
            }
            pEvent.textContent = e.eventname || e.eventName;

            pEvent.addEventListener("click", () => {
              const page = document.getElementById("page");
              const eventDetail = document.createElement("dialog");
              eventDetail.className = "eventDetailDialog";

              page.appendChild(eventDetail);
              eventDetail.showModal();

              eventDetail.innerHTML = `
              <ul class="eventName" >"${e.eventname || e.eventName}"
                <li class="eventsDetail">Start Date: ${
                  e.startDate || e.startdate
                }</li>
                <li class="eventsDetail">End Date: ${
                  e.endDate || e.enddate
                }</li>
                <li class="eventsDetail">Participant: ${
                  e.invite || e.userJoin
                }</li>
                <li class="eventsDetail">Comment: ${e.user_input}</li>
              </ul>

              `;

              const closeEventDetailDialog = document.createElement("p");
              closeEventDetailDialog.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeEventDetailDialog" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
              closeEventDetailDialog.addEventListener("click", () => {
                eventDetail.close();
                page.removeChild(eventDetail);
              });
              eventDetail.appendChild(closeEventDetailDialog);
            });
            abc.appendChild(pEvent);
          }
        }
      });
    });
  };
  renderCalendar();

  prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

      if (currentMonth < 0 || currentMonth > 11) {
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
