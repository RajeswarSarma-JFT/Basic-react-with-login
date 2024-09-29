export const signupUserFields = [
  {
    name: 'firstName',
    label: 'First Name',
    hideLabel: true,
    type: 'text',
    mandatory: true,
    placeholder: 'First Name*',
    width: 3,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    hideLabel: true,
    type: 'text',
    mandatory: true,
    placeholder: 'Last Name*',
    width: 3,
  },
  {
    name: 'userEmail',
    label: 'Email',
    hideLabel: true,
    type: 'text',
    email: true,
    mandatory: true,
    placeholder: 'Email*',
    width: 6,
  },
  {
    name: 'userContact',
    label: 'Phone Number',
    hideLabel: true,
    type: 'text',
    isPhoneNumber: true,
    placeholder: 'Phone Number',
    width: 6,
  },
  {
    name: 'designation',
    label: 'Designation',
    hideLabel: true,
    type: 'text',
    placeholder: 'Designation',
    width: 6,
  },
];

export const signInFormFields = [
  {
    name: 'email',
    label: 'Email',
    hideLabel: true,
    type: 'text',
    mandatory: true,
    email: true,
    placeholder: 'Enter email',
  },
  {
    name: 'password',
    label: 'Password',
    hideLabel: true,
    type: 'password',
    mandatory: true,
    minLength: 5,
    placeholder: 'Enter password',
  },
];

export const resetPasswordFields = [
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
    isNewPassword: true,
    hideLabel: true,
    mandatory: true,
    minLength: 5,
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm New Password',
    type: 'password',
    hideLabel: true,
    mandatory: true,
    minLength: 5,
    placeholder: 'Confirm Password',
    equalsTo: 'password',
  },
];

export const changePasswordFields = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    hideLabel: true,
    type: 'password',
    mandatory: true,
    minLength: 5,
    placeholder: 'Old Password',
  },
  {
    name: 'newPassword',
    label: 'New Password',
    hideLabel: true,
    type: 'password',
    isNewPassword: true,
    mandatory: true,
    minLength: 5,
    placeholder: 'New Password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm New Password',
    hideLabel: true,
    type: 'password',
    mandatory: true,
    minLength: 5,
    placeholder: 'Confirm New Password',
    equalsTo: 'newPassword',
  },
];

export const forgotPasswordFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    hideLabel: true,
    mandatory: true,
    email: true,
    placeholder: 'Email*',
  },
];

export const passwordField = [
  {
    name: 'password',
    label: 'Password',
    hideLabel: true,
    type: 'password',
    mandatory: true,
    minLength: 5,
    placeholder: 'Enter password',
  },
];
