// ============================================================
// api.js — Bridge antara Frontend Vercel dan Backend Google Apps Script
// ============================================================

// WAJIB: Ganti dengan URL Web App Google Apps Script kamu
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpsybYHfC12mXTk7aJJn84SYl-LvN0hDctwYpuEMBcxWuyzZpKbpAa_H3uhzhxVJOM/exec';

/**
 * Fungsi utama untuk memanggil API Apps Script
 * Menggantikan google.script.run
 */
async function gasRun(action, params = {}) {
  try {
    const body = {
      action: action,
      ...params
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'text/plain;charset=utf-8' 
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('Response bukan JSON:', text.substring(0, 200));
      throw new Error('Response dari server bukan format JSON yang valid');
    }
  } catch (error) {
    console.error(`Error calling ${action}:`, error);
    throw error;
  }
}

// ============================================================
// WRAPPER FUNCTIONS — Wrapper untuk setiap fungsi di Apps Script
// ============================================================

// Authentication
async function loginUser(username, password) {
  return gasRun('loginUser', { username, password });
}

// Dashboard & Tickets
async function getDashboardData() {
  return gasRun('getDashboardData', {});
}

async function getCategories() {
  return gasRun('getCategories', {});
}

async function getSubCategories() {
  return gasRun('getSubCategories', {});
}

async function submitTicket(payload) {
  return gasRun('submitTicket', { payload });
}

async function updateTicketStatus(id, newStatus, catatan, updaterName, idDriver, currentUserRole) {
  return gasRun('updateTicketStatus', { 
    id, 
    newStatus, 
    catatan, 
    updaterName, 
    idDriver, 
    currentUserRole 
  });
}

async function trackTicket(ticketId) {
  return gasRun('trackTicket', { ticketId });
}

async function getTicketDetail(ticketId) {
  return gasRun('getTicketDetail', { ticketId });
}

// Categories Management
async function saveCategory(payload, currentUserRole) {
  return gasRun('saveCategory', { payload, currentUserRole });
}

async function saveSubCategory(payload, currentUserRole) {
  return gasRun('saveSubCategory', { payload, currentUserRole });
}

async function deleteSubCategory(id, currentUserRole) {
  return gasRun('deleteSubCategory', { id, currentUserRole });
}

// Users & Admins
async function getRequesters(currentUserRole) {
  return gasRun('getRequesters', { currentUserRole });
}

async function getAdminUsers(currentUserRole) {
  return gasRun('getAdminUsers', { currentUserRole });
}

async function saveAdminUser(payload, currentUserRole) {
  return gasRun('saveAdminUser', { payload, currentUserRole });
}

async function deleteAdminUser(username, currentUserRole) {
  return gasRun('deleteAdminUser', { username, currentUserRole });
}

// Configuration
async function getConfig() {
  return gasRun('getConfig', {});
}

async function saveConfig(payload, currentUserRole) {
  return gasRun('saveConfig', { payload, currentUserRole });
}

// Form Fields
async function getTicketFields(subKategori) {
  return gasRun('getTicketFields', { subKategori });
}

async function getFormSettings(filterUnit, filterKategori) {
  return gasRun('getFormSettings', { filterUnit, filterKategori });
}

async function saveFormSetting(payload, adminName, currentUserRole) {
  return gasRun('saveFormSetting', { payload, adminName, currentUserRole });
}

async function deleteFormSetting(idSetting, adminName, currentUserRole) {
  return gasRun('deleteFormSetting', { idSetting, adminName, currentUserRole });
}

// Rooms & Vehicles
async function getRoomsData() {
  return gasRun('getRoomsData', {});
}

async function getVehiclesData() {
  return gasRun('getVehiclesData', {});
}

async function getDriversData() {
  return gasRun('getDriversData', {});
}

async function checkScheduleConflict(idRuangan, tgl, jamMulai, jamSelesai) {
  return gasRun('checkScheduleConflict', { idRuangan, tgl, jamMulai, jamSelesai });
}

async function checkVehicleConflict(idKendaraan, tgl, jamMulai, jamSelesai) {
  return gasRun('checkVehicleConflict', { idKendaraan, tgl, jamMulai, jamSelesai });
}

async function checkZoomScheduleConflict(tgl, jamMulai, jamSelesai) {
  return gasRun('checkZoomScheduleConflict', { tgl, jamMulai, jamSelesai });
}

async function getVehicleBooking(ticketId) {
  return gasRun('getVehicleBooking', { ticketId });
}

// SLA Management
async function saveSubCategorySla(id, slaHari, currentUserRole) {
  return gasRun('saveSubCategorySla', { id, slaHari, currentUserRole });
}

// Export & Attachments
async function exportTickets(type) {
  return gasRun('exportTickets', { type });
}

async function uploadTicketAttachment(base64Data, fileName, mimeType, ticketId) {
  return gasRun('uploadTicketAttachment', { base64Data, fileName, mimeType, ticketId });
}

async function saveTicketFieldFileDetail(ticketId, fieldName, fileUrl) {
  return gasRun('saveTicketFieldFileDetail', { ticketId, fieldName, fileUrl });
}

async function notifyAdminAttachments(ticketId, attachments) {
  return gasRun('notifyAdminAttachments', { ticketId, attachments });
}

// Reports
async function sendMonthlyReport() {
  return gasRun('sendMonthlyReport', {});
}

// Lobby Display
async function getLobbyBookingsData() {
  return gasRun('getLobbyBookingsData', {});
}

// Export semua fungsi agar bisa diakses global
if (typeof window !== 'undefined') {
  window.gasRun = gasRun;
  window.loginUser = loginUser;
  window.getDashboardData = getDashboardData;
  window.getCategories = getCategories;
  window.getSubCategories = getSubCategories;
  window.submitTicket = submitTicket;
  window.updateTicketStatus = updateTicketStatus;
  window.trackTicket = trackTicket;
  window.getTicketDetail = getTicketDetail;
  window.saveCategory = saveCategory;
  window.saveSubCategory = saveSubCategory;
  window.deleteSubCategory = deleteSubCategory;
  window.getRequesters = getRequesters;
  window.getAdminUsers = getAdminUsers;
  window.saveAdminUser = saveAdminUser;
  window.deleteAdminUser = deleteAdminUser;
  window.getConfig = getConfig;
  window.saveConfig = saveConfig;
  window.getTicketFields = getTicketFields;
  window.getFormSettings = getFormSettings;
  window.saveFormSetting = saveFormSetting;
  window.deleteFormSetting = deleteFormSetting;
  window.getRoomsData = getRoomsData;
  window.getVehiclesData = getVehiclesData;
  window.getDriversData = getDriversData;
  window.checkScheduleConflict = checkScheduleConflict;
  window.checkVehicleConflict = checkVehicleConflict;
  window.checkZoomScheduleConflict = checkZoomScheduleConflict;
  window.getVehicleBooking = getVehicleBooking;
  window.saveSubCategorySla = saveSubCategorySla;
  window.exportTickets = exportTickets;
  window.uploadTicketAttachment = uploadTicketAttachment;
  window.saveTicketFieldFileDetail = saveTicketFieldFileDetail;
  window.notifyAdminAttachments = notifyAdminAttachments;
  window.sendMonthlyReport = sendMonthlyReport;
  window.getLobbyBookingsData = getLobbyBookingsData;
}
