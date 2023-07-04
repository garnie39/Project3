// import axios from "axios";

export const renderEventsPage = () => {
  const page = document.getElementById("page");
  const eventsList = document.createElement("dialog");
  eventsList.className = "eventsListDialog";
  page.appendChild(eventsList);
  eventsList.showModal();

  const voteSideBar = document.createElement("div");
  voteSideBar.className = "vote";

  voteSideBar.innerHTML = `
  <div class="option">
  <label for="breakfast">Breakfast</label>
  <span id="voteCount1">0</span>
  <button id="tick1"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="tick1" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg></button>
  </div>
  
  <div class="option">
  <label for="brunch">Brunch</label>
  <span id="voteCount2">0</span>
  <button id="tick2"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="tick2" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg></button>
  </div>

  <div class="option">
  <label for="dinner">Dinner</label>
  <span id="voteCount3">0</span>
  <button id="tick3"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="ttick3" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg></button>
  </div>
  `;

  const eventsListContainer = document.createElement("div");
  eventsListContainer.className = "eventsListContainer";

  const tick1 = document.getElementById("tick1");
  const tick2 = document.getElementById("tick2");
  const tick3 = document.getElementById("tick3");

  tick1.addEventListener("click", () => vote(1));
  tick2.addEventListener("click", () => vote(2));
  tick3.addEventListener("click", () => vote(3));

  const voteCounts = [0, 0, 0];
  function vote(option) {
    voteCounts[option - 1]++;
    updateVoteCount(option);
  }
  function updateVoteCount(option) {
    const voteCountElement = document.getElementById("voteCount" + option);
    voteCountElement.textContent = voteCounts[option - 1];
  }

  const closeVote = document.createElement("p");
  closeVote.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=30px" height="30px" fill="currentColor" class="closeVote" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>`;
  closeVote.addEventListener("click", () => {
    eventsListContainer.close();
    voteSideBar.close();
    page.removeChild(eventsList);
  });
  eventsList.append(eventsListContainer, voteSideBar, closeVote);

  fetchAndRenderEvents();
};
