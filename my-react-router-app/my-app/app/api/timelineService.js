// base url for all api requests.
// Set NEXT_PUBLIC_API_URL (e.g. your Render backend URL) in production / on Vercel.
// Falls back to the local Spring Boot server during development.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const apiURL = `${API_BASE}/api/timeline`;

//get request for all events in backend
export async function getAllEvents() {
  const response = await fetch(apiURL);
  return await response.json();
}

//fetches an event by id
export async function getEventById(id) {
  const response = await fetch(`${apiURL}/${id}`);
  return await response.json();
}

//tells backend to create new event
export async function createEvent(eventData) {
  const response = await fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'}, //tells server we sending JSON data
    body: JSON.stringify(eventData),
  });
  return await response.json();
}

//updates existing event with id
export async function updateEvent(id, eventData) {
  const response = await fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(eventData),
  });
  return await response.json();
}

///request to remove event with this id
export async function deleteEvent(id) {
  await fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
  });
  return true;
}

//request to remove event(s) but targeting reset endpoint
export async function resetTimeline() {
  await fetch(`${apiURL}/reset`, {
    method: 'DELETE',
  });
  return true;
}
