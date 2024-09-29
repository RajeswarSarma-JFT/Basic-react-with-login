import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Row, Button } from 'reactstrap';
import CustomForm from 'Components/FormFields/CustomForm';
import { getResetPassword, postResetPassword } from 'Helper/auth_url_helper';
import { resetPasswordFields } from 'Constants/authConstants';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formFields, setFormFields] = useState(resetPasswordFields);
  const resetPassword = (values) => {
    postResetPassword({ password: values.password, token })
      .then((res) => {
        toast.error((res.data.msg || 'Password Set Successfully'), {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/')
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(()=>{
    getResetPassword({ token })
      .then((res) => {
        
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/')
      });
  },[])

  document.title = 'Reset Password';
  return (
    <>
      <Link to="/" className="d-flex justify-content-center">
        <i className="ri-arrow-left-line fs-2 mt-1"></i>
        <button className="btn btn-info">Login</button>
      </Link>
      <div className="auth-generic-form width-40">
        <div className="form-header mb-0">
          <h3>Reset Password</h3>
          <p className="guidance-text text-center">Don't worry. Resetting your password is easy</p>
        </div>
        <CustomForm formFields={formFields} setFormFields={setFormFields} onSubmit={resetPassword} />
      </div>
    </>
  );
};
export default ResetPassword;
