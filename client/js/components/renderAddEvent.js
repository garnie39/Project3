

export const renderAddEvent = () => {
    const page = document.getElementById('page')
    const form = document.createElement('form')
    form.className = "addEventForm"
    form.innerHTML = `
    <label for="eventname">Event name:</label>
    <input type="text" name="eventname" id="eventname" required/>

    <label for="startdate">Start date:</label>
    <input type="date" name="startdate" id="startdate" required/>

    <label for="enddate">End date:</label>
    <input type="date" name="enddate" id="enddate" required/>

    <label for="invite">Invite:</label>
    <input type="text" name="invite" id="invite" required/>

    <input id="submitEventBtn" type="submit">
    `;

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)

        const data = {
            eventname: formData.get("eventname"),
            startdate: formData.get("startdate"),
            enddate: formData.get("enddate"),
            invite: formData.get("invite"),
        }
    })
}