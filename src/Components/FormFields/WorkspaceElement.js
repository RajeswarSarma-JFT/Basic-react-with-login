import React from 'react';
import { Input, FormFeedback } from 'reactstrap';

const InputElement = (props) => {
  const { workspacetextrequired, placeholder, readonly, isTouched, onChange, onBlur, invalid, mandatory, hidden, value, isValid, errormessage } =
    props;
  return (
    <div className="input-group">
      <Input
        type={'text'}
        invalid={invalid}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        mandatory={mandatory ? 'true' : 'false'}
        workspacetextrequired={workspacetextrequired ? 'true' : 'false'}
        autoComplete="off"
        istouched={isTouched}
        hidden={hidden}
        valid={isValid}
      />
      <FormFeedback>{errormessage}</FormFeedback>
      <FormFeedback valid>{props.successmessage}</FormFeedback>

      <div className="input-group-prepend">
        <div className={`input-group-text me-4 ${props.invalid ? 'err' : ''}`}>.konarkpro.com</div>
      </div>
    </div>
  );
};
export default InputElement;
