import React, { useState, useEffect } from 'react';
import { useAuthContext } from 'Context/AuthContext';
import { useNavigate} from 'react-router-dom';
import CustomForm from 'Components/FormFields/CustomForm';
import { changePasswordFields } from 'Constants/authConstants';
import { initializeFormFields, getFormValues, resetFormValues } from 'Components/FormFields/Validation';
import { Col, Row, Form } from 'reactstrap';
import { changePassword } from 'Helper/auth_url_helper';
import { toast } from 'react-toastify';
import { useLogout } from 'Hooks/useLogout';

const ChangePassword = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(changePasswordFields);
  const { logout } = useLogout();
  document.title = 'Change Password';
  useEffect(() => {
    if(!user){
      navigate('/')
    }
  }, [user]);
  const onSubmit = (values) => {
    changePassword({oldPassword:values.oldPassword, newPassword: values.newPassword})
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        logout();
      })
      .catch((err) => {
        resetFormValues(formFields, setFormFields, {});
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <CustomForm formFields={formFields} setFormFields={setFormFields} onSubmit={onSubmit} />
    </>
  );
};

export default ChangePassword;
