
// const initialState = {
//     tasks: [],
//     loading: false,
//     error: null,
//   };
  
//   const taskReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'FETCH_TASKS_REQUEST':
//         return {
//           ...state,
//           loading: true,
//         };
//       case 'FETCH_TASKS_SUCCESS':
//         return {
//           ...state,
//           tasks: action.payload,
//           loading: false,
//         };
//       case 'FETCH_TASKS_FAIL':
//         return {
//           ...state,
//           error: action.payload,
//           loading: false,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default taskReducer;
  
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
  } from '../actions/taskActions';
  
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_REQUEST:
        return { ...state, loading: true };
      case FETCH_TASKS_SUCCESS:
        return { ...state, loading: false, tasks: action.payload };
      case FETCH_TASKS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_TASK_REQUEST:
      case UPDATE_TASK_REQUEST:
      case DELETE_TASK_REQUEST:
        return { ...state, loading: true };
      case ADD_TASK_SUCCESS:
        return { ...state, loading: false, tasks: [...state.tasks, action.payload] };
      case UPDATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
        };
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: state.tasks.filter((task) => task._id !== action.payload),
        };
      case ADD_TASK_FAILURE:
      case UPDATE_TASK_FAILURE:
      case DELETE_TASK_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  