import { DateTime } from 'luxon';

export const getFormValues = (formFields, setFormFields) => {
  const { isFormValid, values, newFormFields } = formFields.reduce(
    ({ isFormValid, values, newFormFields }, field) => {
      field.value = field.value != null && typeof field.value === 'string' ? field.value.trim() : field.value;
      values[field.name] = field.value || parseInt(field.value) >= 0 ? field.value : null;
      field.invalid = !validate(field, formFields);
      if (field.invalid) {
        isFormValid = false;
      }
      newFormFields.push(field);
      return { isFormValid, values, newFormFields };
    },
    { isFormValid: true, values: {}, newFormFields: [] },
  );
  setFormFields(newFormFields);
  return { isFormValid, values };
};

export const initializeFormFields = (formFields, setFormFields) => {
  formFields.forEach((field) => {
    field.invalid = false;
    field.isTouched = 0;
    field.value = field.value == null ? '' : field.value;
    field.errormessage = '';
    if (field.type === 'datepicker') {
      field.onChange = (date) => {
        if (date) {
          field.datePickerValue = date;
          field.value = DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
          field.errormessage = '';
        } else {
          field.datePickerValue = '';
          field.value = '';
        }
        field.invalid = !validate(field, formFields);
        setFormFields([...formFields]);
      };
      field.datePickerValue = field.value ? DateTime.fromISO(field.value).toJSDate() : null;
    } else if (field.type === 'rangedatepicker') {
      field.onChange = (value) => {
        const [startDate, endDate] = value;
        const isValidStartDate = DateTime.fromJSDate(startDate).isValid;
        const isValidEndDate = DateTime.fromJSDate(endDate).isValid;
        if (isValidStartDate && isValidEndDate && startDate <= endDate) {
          field.rangePickerValue = [startDate, endDate];
          field.value = {
            startDate: DateTime.fromJSDate(startDate).toFormat('yyyy-LL-dd'),
            endDate: DateTime.fromJSDate(endDate).toFormat('yyyy-LL-dd'),
          };
        }
        field.invalid = !validate(field, formFields);
        setFormFields([...formFields]);
      };
      const { startDate, endDate } = field.value;
      field.rangePickerValue = [DateTime.fromISO(startDate).toJSDate(), DateTime.fromISO(endDate).toJSDate()];
    } else if (field.type === 'select') {
      field.onChange = (val, action, groupOptions) => {
        field.selectBoxValues = val;
        if (field.isMulti) {
          field.value = val.map((option) => option.value);
          field.group = val.map((option) => option.group);
        } else {
          field.value = val ? val.value : null;
        }
        if (field.value && field.value.length) {
          field.errormessage = '';
        }
        let groupValues = [];
        if (field.isMulti) {
          groupValues = groupOptions.filter((option) => {
            return field.group.includes(option.label);
          });
        }
        if (field.options && field.value != null) {
          if (field.isMulti) {
            field.selectBoxValues = groupValues.flatMap((groupValue) => groupValue.options.filter((option) => field.value.includes(option.value)));
            field.options.forEach((group) => {
              if (group.options) {
                group.options?.forEach((option) => {
                  option.isSelected = field.value.includes(option.value);
                });
              } else {
                group.isSelected = field.value.includes(group.value);
              }
            });
          } else {
            field.selectBoxValues = field.options.find((option) => field.value === option.value) || [];
          }
        } else {
          field.selectBoxValues = [];
        }
        setFormFields([...formFields]);
      };
      if (field.options && field.value != null) {
        if (field.isMulti) {
          field.selectBoxValues = field.options.filter((option) => field.value.includes(option.value));
          field.options = field.options.map((option) => ({
            ...option,
            isSelected: field.value.includes(option.value),
          }));
        } else {
          field.selectBoxValues = field.options.find((option) => field.value === option.value) || [];
        }
      } else {
        field.selectBoxValues = [];
      }
    } else if (field.type === 'texteditor') {
      field.onChange = (value) => {
        field.value = value;
        field.invalid = !validate(field, formFields);
      };
    } else if (field.type === 'file') {
      field.onChange = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 20971520;
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.size <= maxSizeInBytes) {
          field.value = file;
          field.invalid = !validate(field, formFields);
          setFormFields([...formFields]);
        } else if (file.size > maxSizeInBytes) {
          field.value = '';
          field.invalid = !validate(field, formFields);
          field.errormessage = 'File size exceeds the maximum limit.';
          setFormFields([...formFields]);
        } else {
          field.value = '';
          field.invalid = !validate(field, formFields);
          field.errormessage = 'Please select a valid .xlsx file';
          setFormFields([...formFields]);
        }
      };
    } else {
      field.onChange = (e) => {
        const value = field.type === 'workspace' ? e.target.value?.trim?.() : e.target.value;
        if (field.type === 'number') {
          const isFloat = Boolean(value.split('.').length > 1);
          field.value = isFloat ? parseFloat(value) : parseInt(value);
        }
        if (field.type === 'number' && !isNaN(value)) {
          field.value = parseFloat(value);
          field.invalid = !validate(field, formFields);
        } else if (field.isPhoneNumber) {
          if (/^([+]?\d{0,13})$/.test(value)) {
            field.value = value;
            field.invalid = !validate(field, formFields);
          }
        } else if (field.type === 'workspace') {
          field.isValid = false;
          if (/^[a-zA-Z0-9-_]*$/.test(value) || value.length == 0) {
            field.value = value?.toLocaleLowerCase?.();
            field.invalid = !validate(field, formFields);
          }
        } else {
          field.value = value;
          field.invalid = !validate(field, formFields);
        }
        setFormFields([...formFields]);
      };
    }

    if (field.type === 'datepicker' || field.type === 'rangedatepicker') {
      field.onClose = (value) => {
        field.isTouched = 1;
        if ((!value || !value.length) && field.mandatory) {
          field.invalid = true;
          field.errormessage = `${field.label} is required!`;
          field.successmessage = '';
        }
        setFormFields([...formFields]);
      };
    } else {
      field.onBlur = () => {
        field.isTouched = 1;
        if (field.mandatory) {
          if (
            !field.value ||
            (field.type == 'select' && ((field.isMulti && !field.value.length) || (!field.isMulti && !field.value.hasOwnProperty('value'))))
          ) {
            field.invalid = !validate(field, formFields);
          } else {
            field.invalid = !validate(field, formFields);
          }
        } else {
          field.invalid = false;
          field.errormessage = '';
        }
        setFormFields([...formFields]);
      };
    }
  });
  setFormFields([...formFields]);
};

export const resetFormValues = (formFields, setFormFields, values) => {
  formFields.forEach((field) => {
    field.value = values[field.name] == null ? '' : values[field.name];
    field.invalid = false;
    if (field.type === 'datepicker') {
      field.datePickerValue = field.value ? DateTime.fromISO(field.value).toJSDate() : null;
    } else if (field.type === 'select') {
      if (field.options && field.value) {
        if (field.isMulti) {
          field.selectBoxValues = field.options.filter((option) => field.value.includes(option.value));
        } else {
          field.selectBoxValues = field.options.find((option) => field.value === option.value) || [];
        }
      } else {
        field.selectBoxValues = [];
      }
    }
  });
  setFormFields([...formFields]);
};
export const validate = (field, formFields) => {
  if (field.hidden || field.disabled) {
    return true;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneNumberRegex = /^([+]\d{1,3})?\d{10}$/;
  const textEditorRegex = />([^<]+)</;
  const workspaceRegex = /^[a-zA-Z0-9-_]*$/;
  if (field.mandatory && !field.value && isNaN(parseInt(field.value))) {
    field.errormessage = `${field.label} is required!`;
    field.successmessage = '';
    return false;
  }
  if (field.equalsTo) {
    const equalsToField = formFields.find((formField) => formField.name === field.equalsTo);
    if (equalsToField && equalsToField.value != field.value) {
      field.errormessage = `Password doesn't match`;
      field.successmessage = '';
      return false;
    }
  }
  if (field.type === 'password' && field.isNewPassword) {
    if (field.value && !/(?=.*[a-z])/.test(field.value)) {
      field.errormessage = `${field.label} must contain at least 1 lowercase letter`;
      field.successmessage = '';
      return false;
    }
    if (field.value && !/(?=.*[A-Z])/.test(field.value)) {
      field.errormessage = `${field.label} must contain at least 1 uppercase letter`;
      field.successmessage = '';
      return false;
    }
    if (field.value && !/(?=.*[-+_!@#$%^&*., ?])/.test(field.value)) {
      field.errormessage = `${field.label} must contain at least 1 special character`;
      field.successmessage = '';
      return false;
    }
    if (field.value && !/\d/.test(field.value)) {
      field.errormessage = `${field.label} must contain at least 1 number`;
      field.successmessage = '';
      return false;
    }
    if (field.value && field.value.length < 8) {
      field.errormessage = `${field.label} must be at least 8 character long`;
      field.successmessage = '';
      return false;
    }
    return true;
  }
  if (field.type === 'workspace' && field.mandatory) {
    if (field.value.trim() === '') {
      field.errormessage = `${field.label} is required.`;
      field.successmessage = '';
      return false;
    }
    if (!workspaceRegex.test(field.value)) {
      field.errormessage = `${field.label} may not include special characters.`;
      field.successmessage = '';
      return false;
    }
    return true;
  }
  if (field.email && field.value.length) {
    field.errormessage = 'Please enter a valid email!';
    field.successmessage = '';
    return emailRegex.test(field.value?.trim());
  }
  if (field.minLength && field.minLength > field.value.length) {
    field.errormessage = `${field.label} is too short!`;
    field.successmessage = '';
    return false;
  }
  if (field.type === 'number' && field.isPercentage) {
    if (isNaN(field.value) || Math.floor(field.value) < 0 || Math.ceil(field.value > 100)) {
      field.errormessage = `Please provide valid ${field.label}`;
      field.successmessage = '';
      return false;
    }
  }
  if (field.type === 'number') {
    if (field.value < 0) {
      field.errormessage = `Please provide valid ${field.label}`;
      field.successmessage = '';
      return false;
    }
    if ((field.minValue || field.minValue === 0) && field.value < field.minValue) {
      field.errormessage = `${field.label} should be more than ${field.minValue - 1}`;
      field.successmessage = '';
      return false;
    }
    if ((field.maxValue || field.maxValue === 0) && field.value > field.maxValue) {
      field.errormessage = `${field.label} should be less than ${field.maxValue + 1}`;
      field.successmessage = '';
      return false;
    }
    if (field.greaterThan) {
      const minMinuteField = formFields.find((formField) => formField.name === field.greaterThan);
      if (minMinuteField && minMinuteField.value && field.value <= minMinuteField.value) {
        field.errormessage = `${field.label} should be more than ${minMinuteField.label}`;
        field.successmessage = '';
        return false;
      }
    }
    if (field.lessThan) {
      const maxMinuteField = formFields.find((formField) => formField.name === field.lessThan);
      if (maxMinuteField && maxMinuteField.value && field.value >= maxMinuteField.value) {
        field.errormessage = `${field.label} should be less than ${maxMinuteField.label}`;
        field.successmessage = '';
        return false;
      }
    }
  }
  if (field.isPhoneNumber && field.mandatory) {
    field.errormessage = 'Please enter a valid phone number!';
    field.successmessage = '';
    return phoneNumberRegex.test(field.value?.trim());
  }
  if (field.type === 'texteditor' && !textEditorRegex.test(field.value)) {
    field.errormessage = `${field.label} is required!`;
    field.successmessage = '';
    return false;
  }
  if (field.type === 'file') {
    if (!field.value) {
      field.errormessage = `${field.label} is required!`;
      field.successmessage = '';
      return false;
    }
    const file = field.value;
    const maxSizeInBytes = 20971520;
    const allowedFileType = '.xlsx';

    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      field.errormessage = 'Please select a valid .xlsx file';
      field.successmessage = '';
      return false;
    }
    if (file.size > maxSizeInBytes) {
      field.errormessage = 'File size exceeds the maximum limit.';
      field.successmessage = '';
      return false;
    }
  }
  if (field.type === 'datepicker') {
    if (field.lessThanEqualTo) {
      const maxDateField = formFields.find((formField) => formField.name === field.lessThanEqualTo);
      if (maxDateField && maxDateField.value && field.value > maxDateField.value) {
        field.errormessage = `${field.label} should be less than or equal to ${maxDateField.label}`;
        field.successmessage = '';
        return false;
      }
      maxDateField.minValue = new Date(field.value);
    }
    if (field.greaterThanEqualTo) {
      const minDateField = formFields.find((formField) => formField.name === field.greaterThanEqualTo);
      if (minDateField && minDateField.value && field.value < minDateField.value) {
        field.errormessage = `${field.label} should be greater than or equal to ${minDateField.label}`;
        field.successmessage = '';
        return false;
      }
      minDateField.maxValue = new Date(field.value);
    }
  }
  return true;
};
