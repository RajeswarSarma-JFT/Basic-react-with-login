import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Row, Button } from 'reactstrap';
import FormFields from 'Components/FormFields';
import { initializeFormFields, getFormValues } from 'Components/FormFields/Validation';
import { resetPasswordFields } from 'Constants/authConstants';
import Success from 'Components/Common/Success';
import Failure from 'Components/Common/Failure';
import { getResetPassword, postResetPassword } from 'Helper/auth_url_helper';
import logoLight from 'assets/images/logoLight.png';
import { toast } from 'react-toastify';

const CreatePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [formFields, setFormFields] = useState(resetPasswordFields);

  useEffect(() => {
    getResetPassword(token)
      .then(() => {
        initializeFormFields([...formFields], setFormFields);
      })
      .catch((err) => {
        console.error(err)
        navigate('/');
        toast.error(err.response.data.error || 'Password was already created', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);
  const toggleState = () => {
    setFailureMessage('');
  };
  const createPassword = (values) => {
    e.preventDefault();
    const { isFormValid, values } = getFormValues(formFields, setFormFields);
    if (isFormValid) {
      if (values.password !== values.confirmPassword) {
        setFailureMessage('Password and Confirm Password should be same');
      }
      postResetPassword({ password: values.password, token })
        .then((res) => {
          setSuccessMessage(res.data.msg || 'Password Set Successfully');
          navigate('/');
        })
        .catch((err) => {
          setFailureMessage(err.response.data.msg);
        });
    }
  };

  document.title = 'Create Password';
  return (
    <>
      <Link to="/" className="d-flex justify-content-center">
        <i className="ri-arrow-left-line fs-2 mt-1"></i>
        <button className="btn btn-info">Back</button>
      </Link>
      <div className="auth-generic-form width-40">
        <div className="form-header mb-0">
          <h3>Create Password</h3>
          <p className="guidance-text text-center">Don't worry. Creating your password is easy</p>
        </div>

        
      </div>
    </>
  );
};
export default CreatePassword;
