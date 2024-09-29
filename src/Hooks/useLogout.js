import { useAuthContext } from 'Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };
  return { logout };
};
