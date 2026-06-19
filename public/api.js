// ==============================
// CONFIG
// ==============================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbysh9Vlj0NrOZHkB6SZTYzKJ8nUEolkHEqJoSCWvc4ATnyx1S4pGzG-RW2jqd-594ja/exec"; // contoh: https://script.google.com/macros/s/AKfycbxxx/exec


// ==============================
// CORE FETCH (ANTI CORS ERROR)
// ==============================
async function gasRun(action, data = {}) {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify({
        action: action,
        ...data
      })
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Response bukan JSON:", text);
      throw new Error("Server error (bukan JSON)");
    }

  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}


// ==============================
// AUTH
// ==============================
async function loginUser(username, password) {
  return await gasRun("loginUser", { username, password });
}

async function registerUser(data) {
  return await gasRun("registerUser", data);
}


// ==============================
// DASHBOARD
// ==============================
async function getDashboard() {
  return await gasRun("getDashboard");
}


// ==============================
// TICKET
// ==============================
async function createTicket(data) {
  return await gasRun("createTicket", data);
}

async function getTickets(userId) {
  return await gasRun("getTickets", { userId });
}

async function updateTicket(id, data) {
  return await gasRun("updateTicket", { id, ...data });
}

async function deleteTicket(id) {
  return await gasRun("deleteTicket", { id });
}


// ==============================
// REQUEST
// ==============================
async function createRequest(data) {
  return await gasRun("createRequest", data);
}

async function getRequests(userId) {
  return await gasRun("getRequests", { userId });
}


// ==============================
// UTILITY
// ==============================
function showLoading() {
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
}

function hideLoading() {
  Swal.close();
}

function showSuccess(msg) {
  Swal.fire("Sukses", msg, "success");
}

function showError(msg) {
  Swal.fire("Error", msg, "error");
}
