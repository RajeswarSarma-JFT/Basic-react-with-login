import React from 'react';

const CheckboxOption = ({ innerRef, innerProps, data }) => {
  return (
    <div ref={innerRef} {...innerProps}>
      <div>
        <input style={{ width: '10%' }} type="checkbox" checked={data.isSelected} />
        <label className="checkbox-label">{data.label}</label>
      </div>
    </div>
  );
};

export default CheckboxOption;
