import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CheckboxOption from './CheckboxOption';
import MultiValue from './MultiValue';

const SelectElement = ({ options = [], value = [], ...props }) => {
  const {
    name,
    disabled,
    hideSelectedOptions,
    isMulti = false,
    components = {},
    isSearchable = true,
    placeholder,
    isClearable,
    selectBoxValues,
    isTouched,
    hidden,
    onChange,
    onBlur,
    mandatory,
    label,
    classNamePrefix,
    styles = {},
  } = props;

  let allOptions = [];

  const [allSelected, setAllSelected] = useState(isMulti && value?.length === allOptions.length);
  const selectTag = [{ label: 'Select All', value: 'select', isSelected: allSelected }];

  if (isMulti) {
    const existingGroupIndex = options.findIndex((existingOption) => Array.isArray(existingOption.options));
    if (existingGroupIndex === -1) {
      options = [{ label: label, options: options.map((option) => ({ ...option, group: label })) }];
    }
  }

  options = isMulti && options?.[0]?.['options']?.length > 0 ? selectTag.concat(options) : options;

  allOptions = isMulti ? options.filter((option) => option.value !== 'select').flatMap((item) => item.options || []) : [];

  useEffect(() => {
    setAllSelected(value && value.length === allOptions.length);
  }, [value]);

  const handleChange = (selectedItems, event) => {
    if (isMulti && event.action === 'select-option' && event.option.value === 'select') {
      allSelected ? onChange([], 'select-all', options) : onChange(allOptions, 'deselect-all', options);
      setAllSelected((prev) => !prev);
    } else {
      const onChangeValue = selectedItems ? selectedItems : [];
      isMulti && setAllSelected(allOptions.length === selectedItems.length);
      const option = event.option || event.removedValue;
      onChange(onChangeValue, event.action, options, option);
    }
  };

  const multiComponents = {
    Option: (props) => {
      return <CheckboxOption {...props} />;
    },
    MultiValue,
  };

  return (
    <div>
      <Select
        options={options}
        components={isMulti ? multiComponents : components}
        isClearable={isClearable}
        name={name}
        className={`shadow-none`}
        onChange={handleChange}
        onBlur={onBlur}
        value={selectBoxValues}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti={isMulti}
        istouched={isTouched}
        mandatory={mandatory ? 'true' : 'false'}
        hidden={hidden}
        aria-multiselectable={true}
        classNamePrefix={classNamePrefix || 'react-modal-select'}
        closeMenuOnSelect={isMulti ? false : true}
        hideSelectedOptions={false}
        isSearchable={isSearchable}
        styles={styles}
      />
    </div>
  );
};
export default SelectElement;
