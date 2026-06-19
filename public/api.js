// ============================================================
// api.js — taruh di folder project Vercel
// Ganti semua google.script.run dengan fungsi-fungsi ini
// ============================================================

// WAJIB diisi dengan URL Apps Script /exec kamu
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/DEPLOYMENT_ID/exec';

/**
 * Fungsi utama untuk call API Apps Script
 * Menggantikan google.script.run
 */
async function gasRun(action, params) {
  var body = Object.assign({ action: action }, params || {});

  var response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    // Apps Script tidak support preflight CORS, pakai text/plain agar no-preflight
    body: JSON.stringify(body)
  });

  var text = await response.text();
  try {
    return JSON.parse(text);
  } catch(e) {
    throw new Error('Response bukan JSON: ' + text.substring(0, 200));
  }
}

// ============================================================
// WRAPPER FUNCTIONS — nama sama persis dengan sebelumnya
// agar tidak perlu banyak ubah kode di Index.html
// ============================================================

function loginUser(username, password) {
  return gasRun('loginUser', { username, password });
}

function getDashboardData() {
  return gasRun('getDashboardData', {});
}

function getCategories() {
  return gasRun('getCategories', {});
}

function getSubCategories() {
  return gasRun('getSubCategories', {});
}

function submitTicket(payload) {
  return gasRun('submitTicket', { payload });
}

function updateTicketStatus(id, newStatus, catatan, updaterName, idDriver, currentUserRole) {
  return gasRun('updateTicketStatus', { id, newStatus, catatan, updaterName, idDriver, currentUserRole });
}

function trackTicket(ticketId) {
  return gasRun('trackTicket', { ticketId });
}

function getTicketDetail(ticketId) {
  return gasRun('getTicketDetail', { ticketId });
}

function saveCategory(payload, currentUserRole) {
  return gasRun('saveCategory', { payload, currentUserRole });
}

function saveSubCategory(payload, currentUserRole) {
  return gasRun('saveSubCategory', { payload, currentUserRole });
}

function deleteSubCategory(id, currentUserRole) {
  return gasRun('deleteSubCategory', { id, currentUserRole });
}

function getRequesters(currentUserRole) {
  return gasRun('getRequesters', { currentUserRole });
}

function getAdminUsers(currentUserRole) {
  return gasRun('getAdminUsers', { currentUserRole });
}

function saveAdminUser(payload, currentUserRole) {
  return gasRun('saveAdminUser', { payload, currentUserRole });
}

function deleteAdminUser(username, currentUserRole) {
  return gasRun('deleteAdminUser', { username, currentUserRole });
}

function getConfig() {
  return gasRun('getConfig', {});
}

function saveConfig(payload, currentUserRole) {
  return gasRun('saveConfig', { payload, currentUserRole });
}

function getTicketFields(subKategori) {
  return gasRun('getTicketFields', { subKategori });
}

function getFormSettings(filterUnit, filterKategori) {
  return gasRun('getFormSettings', { filterUnit, filterKategori });
}

function saveFormSetting(payload, adminName, currentUserRole) {
  return gasRun('saveFormSetting', { payload, adminName, currentUserRole });
}

function deleteFormSetting(idSetting, adminName, currentUserRole) {
  return gasRun('deleteFormSetting', { idSetting, adminName, currentUserRole });
}

function getRoomsData() {
  return gasRun('getRoomsData', {});
}

function getVehiclesData() {
  return gasRun('getVehiclesData', {});
}

function getDriversData() {
  return gasRun('getDriversData', {});
}

function checkScheduleConflict(idRuangan, tgl, jamMulai, jamSelesai) {
  return gasRun('checkScheduleConflict', { idRuangan, tgl, jamMulai, jamSelesai });
}

function checkVehicleConflict(idKendaraan, tgl, jamMulai, jamSelesai) {
  return gasRun('checkVehicleConflict', { idKendaraan, tgl, jamMulai, jamSelesai });
}

function checkZoomScheduleConflict(tgl, jamMulai, jamSelesai) {
  return gasRun('checkZoomScheduleConflict', { tgl, jamMulai, jamSelesai });
}

function getVehicleBooking(ticketId) {
  return gasRun('getVehicleBooking', { ticketId });
}

function saveSubCategorySla(id, slaHari, currentUserRole) {
  return gasRun('saveSubCategorySla', { id, slaHari, currentUserRole });
}

function exportTickets(type) {
  return gasRun('exportTickets', { type });
}

function uploadTicketAttachment(base64Data, fileName, mimeType, ticketId) {
  return gasRun('uploadTicketAttachment', { base64Data, fileName, mimeType, ticketId });
}

function saveTicketFieldFileDetail(ticketId, fieldName, fileUrl) {
  return gasRun('saveTicketFieldFileDetail', { ticketId, fieldName, fileUrl });
}

function notifyAdminAttachments(ticketId, attachments) {
  return gasRun('notifyAdminAttachments', { ticketId, attachments });
}

function sendMonthlyReport() {
  return gasRun('sendMonthlyReport', {});
}

function getLobbyBookingsData() {
  return gasRun('getLobbyBookingsData', {});
}
