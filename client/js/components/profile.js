import { renderEventsPage } from "./eventspage.js";

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
          const startDateToMatch = e.startDate || e.startdate;
          const endDateToMatch = e.enddate || e.endDate;
          let abc = document.getElementById(`${startDateToMatch}`);
          const xyz = document.getElementById(`${endDateToMatch}`);
          if (abc == xyz) {
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

              if (e.username == user && e.userJoin.length == 0) {
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
                <a id="editBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="editBtn" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>
                <a id="deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="deleteBtn" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg></a>
                `;

                const editBtn = document.getElementById("editBtn");
                const deleteBtn = document.getElementById("deleteBtn");

                editBtn.addEventListener("click", () => {
                  const editFormDialog = document.createElement("dialog");
                  const editForm = document.createElement("form");
                  editForm.className = "editForm";
                  eventDetail.appendChild(editFormDialog);
                  editFormDialog.showModal();

                  editForm.innerHTML = `
                  <label for="updateEventName">Event name:</label>
                  <input type="text" name="eventname" id="eventname" required/><br>
  
                  <label for="startdate">Start date:</label>
                  <input type="date" name="startdate" id="startdate" required/><br>
  
                  <label for="enddate">End date:</label>
                  <input type="date" name="enddate" id="enddate" required/><br>
  
                  <label for="invite">Invite:</label>
                  <input type="text" name="invite" id="invite"><br>
  
                  <label for="timestamp" hidden></label>
                  <input type="date" name="timestamp" id="timestamp" hidden/>
  
                  <label for="comment">Comment:</label>
                  <input type="text" name="comment" id="comment" />
  
                  <input id="submitEventBtn" type="submit">`;

                  const closeUpdateEvent = document.createElement("p");
                  closeUpdateEvent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeUpdateEvent" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
                  closeUpdateEvent.addEventListener("click", () => {
                    editFormDialog.close();
                    eventDetail.removeChild(editFormDialog);
                  });
                  editFormDialog.append(editForm, closeUpdateEvent);

                  editForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const formData = new FormData(editForm);
                    const todayTimeStamp = new Date();

                    const updateEvent = {
                      currentTime: todayTimeStamp,
                      eventName: formData.get("eventname"),
                      startDate: formData.get("startdate"),
                      endDate: formData.get("enddate"),
                      userJoin: formData.get("invite"),
                      user_input: formData.get("comment"),
                    };

                    axios
                      .put(`/api/events/${e._id}`, updateEvent)
                      .then(renderProfile());
                  });
                });

                deleteBtn.addEventListener("click", () => {
                  axios.delete(`/api/events/${e._id}`).then(renderProfile());
                });

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
              } else {
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
                <a id="linkEventPage"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="linkEventPage" viewBox="0 0 16 16">
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
              </svg></a>
                `;

                const linkEventPage = document.getElementById("linkEventPage");

                linkEventPage.addEventListener("click", () => {
                  // renderEventsPage();
                });

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
              }
            });
            abc.appendChild(pEvent);
            // console.log(abc);
          }
          // console.log(endDateToMatch);
          // console.log(startDateToMatch);
          if (endDateToMatch > startDateToMatch) {
            const z = new Date(endDateToMatch);
            const a = new Date(startDateToMatch);
            const dateDiff = Math.ceil((z - a) / (1000 * 60 * 60 * 24));
            console.log(dateDiff);
            for (let i = 0; i <= dateDiff; i++) {
              let date = new Date(e.startDate);
              const pEvent = document.createElement("p");

              if (e.username == user) {
                pEvent.className = "eventList";
              } else {
                pEvent.className = "someoneEventList";
              }
              pEvent.textContent = e.eventname || e.eventName;
              // pEvent.style.width = "500px";
              date.setDate(date.getDate() + i);
              // console.log(e.startDate);
              // console.log(date);
              // let ab = document.getElementById(`${startDateToMatch}`);
              let ab = document.getElementById(
                `${date.toISOString().split("T")[0]}`
              );
              ab.appendChild(pEvent);
              console.log(ab);
              // ab.appendChild(pEvent);
              pEvent.addEventListener("click", () => {
                const page = document.getElementById("page");
                const eventDetail = document.createElement("dialog");
                eventDetail.className = "eventDetailDialog";

                page.appendChild(eventDetail);
                eventDetail.showModal();

                if (e.username == user && e.userJoin.length == 0) {
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
                  <a id="editBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="editBtn" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></a>
                  <a id="deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="deleteBtn" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg></a>
                  `;

                  const editBtn = document.getElementById("editBtn");
                  const deleteBtn = document.getElementById("deleteBtn");

                  editBtn.addEventListener("click", () => {
                    const editFormDialog = document.createElement("dialog");
                    const editForm = document.createElement("form");
                    editForm.className = "editForm";
                    eventDetail.appendChild(editFormDialog);
                    editFormDialog.showModal();

                    editForm.innerHTML = `
                    <label for="updateEventName">Event name:</label>
                    <input type="text" name="eventname" id="eventname" required/><br>
    
                    <label for="startdate">Start date:</label>
                    <input type="date" name="startdate" id="startdate" required/><br>
    
                    <label for="enddate">End date:</label>
                    <input type="date" name="enddate" id="enddate" required/><br>
    
                    <label for="invite">Invite:</label>
                    <input type="text" name="invite" id="invite"><br>
    
                    <label for="timestamp" hidden></label>
                    <input type="date" name="timestamp" id="timestamp" hidden/>
    
                    <label for="comment">Comment:</label>
                    <input type="text" name="comment" id="comment" />
    
                    <input id="submitEventBtn" type="submit">`;

                    const closeUpdateEvent = document.createElement("p");
                    closeUpdateEvent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeUpdateEvent" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>`;
                    closeUpdateEvent.addEventListener("click", () => {
                      editFormDialog.close();
                      eventDetail.removeChild(editFormDialog);
                    });
                    editFormDialog.append(editForm, closeUpdateEvent);

                    editForm.addEventListener("submit", (event) => {
                      event.preventDefault();
                      const formData = new FormData(editForm);
                      const todayTimeStamp = new Date();

                      const updateEvent = {
                        currentTime: todayTimeStamp,
                        eventName: formData.get("eventname"),
                        startDate: formData.get("startdate"),
                        endDate: formData.get("enddate"),
                        userJoin: formData.get("invite"),
                        user_input: formData.get("comment"),
                      };

                      axios
                        .put(`/api/events/${e._id}`, updateEvent)
                        .then(renderProfile());
                    });
                  });

                  deleteBtn.addEventListener("click", () => {
                    axios.delete(`/api/events/${e._id}`).then(renderProfile());
                  });

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
                } else {
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
                  <a id="linkEventPage"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="linkEventPage" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                </svg></a>
                  `;

                  const linkEventPage =
                    document.getElementById("linkEventPage");

                  linkEventPage.addEventListener("click", () => {
                    renderEventsPage();
                  });

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
                }
              });
            }
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
