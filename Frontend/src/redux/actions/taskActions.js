import axios from 'axios';

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

// API Endpoint
const API_URL = 'https://eventmanagement-i5yz.onrender.com/api/events';

// Action Creators
export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const { data } = await axios.get(API_URL);
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

export const addTask = (task) => async (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  try {
    const { data } = await axios.post(API_URL, task);
    dispatch({ type: ADD_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TASK_FAILURE, payload: error.message });
  }
};

export const updateTask = (taskId, task) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST });
  try {
    const { data } = await axios.put(`${API_URL}/${taskId}`, task);
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({ type: DELETE_TASK_FAILURE, payload: error.message });
  }
};
