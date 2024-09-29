import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomForm from 'Components/FormFields/CustomForm';
import { forgotPassword } from 'Helper/auth_url_helper';
import { forgotPasswordFields } from 'Constants/authConstants';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [formFields, setFormFields] = useState(forgotPasswordFields);
  const onSubmit = (values) => {
      forgotPassword({ ...values })
        .then((res) => {
            toast.success(res.data.msg, {
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

  return (
    <>
        <Link to="/" className="d-flex justify-content-center">
            <i className="ri-arrow-left-line fs-2 mt-1"></i>
            <button className="btn btn-info">Login</button>
        </Link>

        <div className="form-header">
            <h3>Forgot Password?</h3>
        </div>

        <CustomForm formFields={formFields} setFormFields={setFormFields} onSubmit={onSubmit} />
    </>
  );
};
export default ForgotPassword;
