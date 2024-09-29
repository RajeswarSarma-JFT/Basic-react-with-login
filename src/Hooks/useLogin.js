import { useAuthContext } from 'Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from 'Helper/auth_url_helper';
import { setAuthorization } from "Helper/api_helper"

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logIn = (email, password) => {
    login({ email, password })
      .then((res) => {
        const { token, user } = res.data;
        dispatch({ type: 'LOGIN', payload: user });
        localStorage.setItem('token', token);
        setAuthorization(token)
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return { logIn };
};
