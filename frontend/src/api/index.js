import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-manager-backend-inky.vercel.app/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return req;
});

// User APIs
export const signInApi = (data) => API.post('/users/signin', data);

export const signUpApi = (data) => API.post('/users/signup', data);

export const resetPasswordApi = (data) =>
  API.put('/users/reset-password', data);
export const getUserApi = (userId) => API.get(`/users/${userId}`);

//Task APIs
export const addTaskApi = (newTask) => API.post('/tasks/', newTask);
export const getTasksApi = () => API.get('/tasks/');
export const updateTaskApi = (taskId, update) =>
  API.put(`/tasks/${taskId}`, update);
export const deleteTaskApi = (taskId) => API.delete(`/tasks/${taskId}`);
