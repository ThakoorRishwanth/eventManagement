import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });

    const { data } = await axios.post('https://eventmanagement-i5yz.onrender.com/api/auth/login', { email, password });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: data.user, token: data.token },
    });

    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const register = (name, email, password, role = 'user') => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });

    const { data } = await axios.post('https://eventmanagement-i5yz.onrender.com/api/auth/register', { name, email, password, role });

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: { user: data.user, token: data.token },
    });

    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};