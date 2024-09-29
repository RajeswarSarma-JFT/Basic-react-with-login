import React from 'react';
import Select from 'react-select';

const SelectElement = (props) => {
  const {
    name,
    options,
    disabled,
    isMulti = false,
    placeholder,
    errormessage,
    isClearable,
    invalid,
    selectBoxValues,
    isTouched,
    hidden,
    onChange,
    onBlur,
    mandatory,
  } = props;

  return (
    <div className="mb-2">
      <Select
        options={options}
        isClearable={isClearable}
        name={name}
        className={`shadow-none`}
        onChange={onChange}
        onBlur={onBlur}
        value={selectBoxValues}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti={isMulti}
        istouched={isTouched}
        mandatory={mandatory ? 'true' : 'false'}
        hidden={hidden}
        classNamePrefix="react-modal-select"
      />
      {invalid && <span className="invalid-feedback d-block">{errormessage}</span>}
    </div>
  );
};
export default SelectElement;
