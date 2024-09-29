export const CONSTANT = {
  SOCKET_EVENT: 'SOCKET_TRIGGER',


  ROLE_EMPLOYEE: 'ROLE_EMPLOYEE',
  ROLE_MANAGER: 'ROLE_MANAGER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER_TYPE_OBJ: {
    'ROLE_EMPLOYEE': 'admin',
    'ROLE_MANAGER': 'manager',
    'ROLE_ADMIN': 'employee',
  },

  USER_TYPE_ARRAY: [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
  ]
};
