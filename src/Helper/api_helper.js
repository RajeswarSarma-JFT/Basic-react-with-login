import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'Context/AuthContext';
import { useLogout } from 'Hooks/useLogout';
import { toast } from 'react-toastify';
import { checkSession } from 'Helper/auth_url_helper';

const baseURL = `${process.env.REACT_APP_BASE_URL}`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
const setAuthorization = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = "JWT " + token;
};

const post = async (url, data, reqHeaders) => {
  let res;
  if (reqHeaders) {
    res = await axiosInstance.post(url, data, {
      headers: reqHeaders,
    });
  } else {
    res = await axiosInstance.post(url, data);
  }
  return res.data.data ? res.data : res;
};

const get = async (url, requestParams = {}) => {
  const res = await axiosInstance.get(baseURL + url, requestParams);
  return res.data.data ? res.data : res;
};

const patch = async (url, data) => {
  const res = axiosInstance.patch(url, data);
  return res.data.data ? res.data : res;
};

const put = async (url, data) => {
  const res = await axiosInstance.put(url, data);
  return res.data.data ? res.data : res;
};

const remove = async (url, data) => {
  const res = await axiosInstance.delete(url, data);
  return res.data.data ? res.data : res;
};

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { dispatch: authDispatch } = useAuthContext();
  const { logout } = useLogout();

  const checkUserSession = () => {
    const token = localStorage.getItem('token');
    if(token){
      setAuthorization(token)
      checkSession()
        .then((res) => {
          const { user } = res.data;
          if(user){
            authDispatch({ type: 'LOGIN', payload: user });
          } else {
            navigate('/')
          }
          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    let toastId;
    const resInterceptor = (response) => {
      return response;
    };

    const reqInterceptor = (request) => {
      request.withCredentials = true;
      return request;
    };

    const errInterceptor = (error) => {
      if (error.response.status === 401) {
        if (toastId && toast.isActive(toastId)) {
          toast.update(toastId, {
            render: error.response.data.msg,
          });
        } else {
          toastId = toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        logout()
        navigate('/');
      } else if (error.response.status === 403) {
        if (toastId && toast.isActive(toastId)) {
          toast.update(toastId, {
            render: error.response.data.msg,
          });
        } else {
          toastId = toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        checkUserSession();
        navigate('/');
      }
      return Promise.reject(error);
    };

    // const reqInterceptorId = axiosInstance.interceptors.request.use(
    //   (request) => {
    //     return request;
    //   },
    //   errInterceptor
    // );
    // const resInterceptorId = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

    const reqInterceptorId = axiosInstance.interceptors.request.use(reqInterceptor);
    const resInterceptorId = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

    checkUserSession();

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptorId);
      axiosInstance.interceptors.response.eject(resInterceptorId);
    };
  }, []);
  return children;
};

export { AxiosInterceptor, setAuthorization, get, post, patch, put, remove };
