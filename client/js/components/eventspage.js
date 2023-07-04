import axios from "axios";

const renderEventsPage = () => {
  const page = document.getElementById("page");
  const eventsList = document.createElement("dialog");
  eventsList.className = "eventsListDialog";
  page.appendChild(eventsList);
  eventsList.showModal();

  const eventsListContainer = document.createElement("div");
  eventsListContainer.className = "eventsListContainer";
  eventsList.appendChild(eventsListContainer);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    eventsList.close();
    page.removeChild(eventsList);
  });
  eventsList.appendChild(closeButton);

  
  const fetchAndRenderEvents = () => {
    axios
      .get("/events")
      .then((response) => {
        const events = response.data;
        eventsListContainer.innerHTML = "";

        events.forEach((event) => {
          const eventItem = document.createElement("div");
          eventItem.className = "eventItem";

          const eventName = document.createElement("h3");
          eventName.textContent = event.eventName;
          eventItem.appendChild(eventName);

          const eventDates = document.createElement("p");
          eventDates.textContent = `${event.startDate} - ${event.endDate}`;
          eventItem.appendChild(eventDates);
          eventsListContainer.appendChild(eventItem);
        });
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
      });
  };

  fetchAndRenderEvents();
};


