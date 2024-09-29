import React from 'react';
import { Input, FormFeedback } from 'reactstrap';

const InputElement = (props) => {
  const { placeholder, readonly, type, isTouched, onChange, onBlur, invalid, rows, mandatory, hidden, className, errormessage } = props;
  return (
    <div className="mb-2">
      <Input
        type={type}
        invalid={invalid}
        onChange={onChange}
        onBlur={onBlur}
        value={props.value || ''}
        placeholder={placeholder}
        readOnly={readonly}
        autoComplete="off"
        istouched={isTouched}
        rows={rows}
        hidden={hidden}
        mandatory={mandatory ? 'true' : 'false'}
        className={className}
      />
      <FormFeedback>{errormessage}</FormFeedback>
    </div>
  );
};
export default InputElement;
