import React, { useState } from 'react';
import CustomForm from 'Components/FormFields/CustomForm';
import { signInFormFields } from 'Constants/authConstants';
import { useLogin } from 'Hooks/useLogin';
import { Col, Row, Form } from 'reactstrap';

const SigninPage = () => {
  const [formFields, setFormFields] = useState(signInFormFields);
  const { logIn } = useLogin();

  const onSubmit = (values) => {
    logIn(values.email, values.password);
  };

  return (
    <CustomForm formFields={formFields} setFormFields={setFormFields} onSubmit={onSubmit} />
  );
};
export default SigninPage;
