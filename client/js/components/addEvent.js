import { renderProfile } from "./profile.js";

export const renderAddEvent = (user) => {
  const page = document.getElementById("page");
  const addEventDialog = document.createElement("dialog");
  const form = document.createElement("form");

  addEventDialog.className = "addEventDialog";
  form.className = "addEventForm";

  page.appendChild(addEventDialog);
  addEventDialog.showModal();

  form.innerHTML = `
    <label for="eventname">Event name:</label>
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

    <input id="submitEventBtn" type="submit">
    `;

  const closeAddEventDialog = document.createElement("p");
  closeAddEventDialog.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="closeAddEventBtn" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  closeAddEventDialog.addEventListener("click", () => {
    addEventDialog.close();
    page.removeChild(addEventDialog);
  });

  addEventDialog.append(form, closeAddEventDialog);

  axios.get("/api/login").then((res) => {
    user = res.data;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const todayTimeStamp = new Date();

      const data = {
        timestamp: todayTimeStamp,
        username: user.username,
        eventname: formData.get("eventname"),
        startdate: formData.get("startdate"),
        enddate: formData.get("enddate"),
        userJoin: formData.get("invite"),
        userInput: formData.get("comment"),
      };
      axios
        .post("/api/events", data)
        .then((_) => {
          // fetchEvents();
          console.log(data);
          renderProfile();
        })
        .catch((error) => {
          console.log("Error adding event:", error);
        });
    });
  });

  // fetch and render the events when the dialog is opened
  // addEventDialog.addEventListener("open", () => {
  //   fetchEvents();
  // });
};

// fetches events from server and render them on the page
// const fetchEvents = () => {
//   axios
//     .get("/api/events")
//     .then((response) => {
//       const events = response.data;
//       renderEvents(events);
//     })
//     .catch((error) => {
//       console.log("Error fetching events:", error);
//     });
// };

// // render events on the page
// const renderEvents = (events) => {
//   // clear previous event list
//   const eventList = document.getElementById("eventList");
//   eventList.innerHTML = "";

//   // render each event
//   events.forEach((event) => {
//     const eventItem = document.createElement("li");
//     eventItem.textContent = event.eventname;
//     eventList.appendChild(eventItem);
//   });
// };
