import { get, post, put, remove } from './api_helper';

export const getDashboardData = function (isArchived) {
  return get(`/superadmin/dashboard-data/${isArchived}`);
  // return get(`api/dashboard`);
};

export const getContactUsData = function (params) {
  return post(`/superadmin/contact-us`, params);
};

export const getFreeTrialData = function (params) {
  return post(`/superadmin/free-trial`, params);
};

export const getSignUpRequestData = function (params) {
  return post(`/superadmin/sign-up-request`, params);
};

export const getFormRequestCounts = function () {
  return get(`/superadmin/form-submitted-count`);
};

export const setCompanyAccess = function (params) {
  return post('/superadmin/company/access', params);
};
export const archiveCompany = function (id) {
  return post(`/superadmin/company/archive/${id}`);
};
export const restoreCompany = function (id) {
  return post(`/superadmin/company/restore/${id}`);
};
export const deleteCompany = function (id) {
  return remove(`/superadmin/company/delete/${id}`);
};

export const deleteFreeTrialEntry = function (id) {
  return remove(`/superadmin/free-trial/${id}`);
};

export const deleteContactUsEntry = function (id) {
  return remove(`/superadmin/contact-us/${id}`);
};

export const getTimezones = function () {
  return get(`/superadmin/timezones`);
};

export const createCompany = function (params) {
  return post('/superadmin/company-add', params);
};

export const getCompanyProfile = function (id) {
  return get(`/superadmin/companyprofile/${id}`);
};

export const postCompanyProfile = function (id, params) {
  const modifiedparams = { ...params, id: id };
  return post(`/superadmin/update/company`, modifiedparams);
};

export const getUserList = function (id, params) {
  return post(`/superadmin/users/${id}`, params);
};

export const disableTwoFactorAuthentication = function (id, params) {
  return post(`/superadmin/disable-two-step-auth/${id}`, params);
};

export const superAdminBlockedContentTables = function () {
  return get('/superadmin/blocked-content-datatables');
};

export const addBlockedContentSuperAdmin = function (params) {
  return post('/superadmin/blocked-content-add', params);
};

export const deleteBlockedContentSuperAdmin = function (params) {
  return post('/superadmin/blocked-content-delete', params);
};

export const getDesignationTables = function () {
  return get('/superadmin/designation-datatables');
};

export const getSkillsTables = function () {
  return get('/superadmin/technology-datatables');
};

export const addDesignation = function (params) {
  return post('/superadmin/designation-add', params);
};

export const addTechnology = function (params) {
  return post('/superadmin/technology-add', params);
};

export const deleteTechnology = function (params) {
  return post('/superadmin/technology-delete', params);
};

export const deleteDesignation = function (params) {
  return post('/superadmin/designation-delete', params);
};

export const uploadApp = function (fileData, reqHeaders) {
  return post(`/superadmin/uploadApp`, fileData, reqHeaders);
};

export const getVersion = function () {
  return get('/superadmin/getAppVersion');
};
export const toggleShiftBase = function (params) {
  return post('/superadmin/shift-base/update', params);
};
export const toggleTwoStepAuth = function (params) {
  return post('/superadmin/two-step-authentication/update', params);
};
export const toggleInvoiceVisible = function (params) {
  return post('/superadmin/invoice-visible/update', params);
};
export const getCompanySetting = function (params) {
  return post('/superadmin/company-setting', params);
};

export const getAppErrors = function (params) {
  return post('/superadmin/app-errors', params);
};

export const archiveMultipleErrors = function (params) {
  return put('/superadmin/app-errors-archive', params);
};
export const restoreMultipleErrors = function (params) {
  return put('/superadmin/app-errors-restore', params);
};
export const changeErrorStatus = function (params) {
  return put('/superadmin/change-error-status', params);
};