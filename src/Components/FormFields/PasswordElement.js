import React, { useState } from 'react';
import { Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

const PasswordElement = ({ ...props }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const { placeholder, isTouched, onChange, onBlur, invalid, mandatory, hidden, value, disabled, errormessage } = props;
  return (
    <div className="position-relative auth-pass-inputgroup mb-3">
      <Input
        onChange={onChange}
        onBlur={onBlur}
        invalid={invalid}
        placeholder={placeholder}
        mandatory={mandatory ? 'true' : 'false'}
        autoComplete="off"
        type={passwordShown ? 'text' : 'password'}
        istouched={isTouched}
        hidden={hidden}
        value={value}
        disabled={disabled}
        className={`opacity-${disabled ? '50' : '100'}`}
        style={{
          backgroundOrigin: 'content-box',
        }}
      />
      <FormFeedback>{errormessage}</FormFeedback>
      <Link
        className={`btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon opacity-${disabled ? '50' : '100'}`}
        to={'#'}
        onClick={togglePassword}
      >
        <i className={passwordShown ? `ri-eye-off-line align-middle` : ` ri-eye-line align-middle`}></i>
      </Link>
    </div>
  );
};
export default PasswordElement;
