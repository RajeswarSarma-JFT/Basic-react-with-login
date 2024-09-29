import React from 'react';
import Flatpickr from 'react-flatpickr';

const RangeDatePickerElement = (props) => {
  const { name, mandatory, readonly, invalid, errormessage, rangePickerValue, isTouched, placeholder, onClose, onChange, hidden } = props;
  return (
    <div className="mb-2">
      <Flatpickr
        name={name}
        onChange={onChange}
        onClose={onClose}
        value={rangePickerValue}
        istouched={isTouched}
        placeholder={placeholder}
        mandatory={mandatory ? 'true' : 'false'}
        hidden={hidden}
        className={`form-control shadow-none`}
        options={{
          mode: 'range',
          dateFormat: 'd M, Y',
        }}
      />
      {invalid && <span className="invalid-feedback d-block">{errormessage}</span>}
    </div>
  );
};
export default RangeDatePickerElement;
