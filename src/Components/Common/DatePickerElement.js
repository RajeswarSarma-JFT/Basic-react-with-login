import React from 'react';
import DatePicker from 'react-datepicker';
import { ReactComponent as DatePickerIcon } from 'assets/images/DatePickerIcon.svg';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerElement = (props) => {
  const { name, mandatory, datePickerValue, isTouched, onChange, placeholder, hidden, onClose, minValue, maxValue } = props;
  return (
    <div className={`position-relative auth-pass-inputgroup mb-2 `}>
      <DatePicker
        name={name}
        selected={datePickerValue}
        onChange={onChange}
        placeholderText={placeholder}
        autoComplete="off"
        className={`form-control shadow-none field-border `}
        mandatory={mandatory ? 'true' : 'false'}
        onClose={onClose}
        istouched={isTouched}
        hidden={hidden}
        dateFormat="d MMM, yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={minValue}
        maxDate={maxValue}
      />
      <div className="position-absolute end-0 top-0 my-1 mx-1 datepicker-icon">
        <DatePickerIcon />
      </div>
    </div>
  );
};

export default DatePickerElement;
