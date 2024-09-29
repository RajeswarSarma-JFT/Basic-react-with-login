import { get, post } from './api_helper';

export const checkSession = function () {
  return get(`/check-session`);
};

export const switchUser = function () {
  return get(`/switch-user`);
};

export const switchUserSuperAdmin = function (params) {
  return post('/switch-user-super', params);
};

export const login = function (params) {
  return post('/login', params);
};
export const forgotPassword = function (params) {
  return post('/forgot-password', params);
};
export const getResetPassword = function (token) {
  return get(`/reset-password/${token}`);
};
export const postResetPassword = function (params) {
  return post('/reset-password', params);
};
export const changePassword = function (params) {
  return post('/change-password', params);
};