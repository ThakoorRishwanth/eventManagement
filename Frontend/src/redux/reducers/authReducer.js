

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    objectId: localStorage.getItem('objectId') || null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'REGISTER_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
        };
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  