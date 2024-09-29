import React from 'react';

import { ReactComponent as DropdownArrow } from 'assets/images/DropdownArrow.svg';
import SelectElement from 'Components/Common/SelectComponents/SelectElement';

const ReactSelectFilter = (props) => {
  return (
    <div>
      <SelectElement
        {...props}
        components={{
          DropdownIndicator: DropdownArrow,
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            minWidth: '8rem',
          }),
        }}
        classNamePrefix={'react-select'}
        isSearchable={false}
      />
    </div>
  );
};

export default ReactSelectFilter;
