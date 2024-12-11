import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return req;
});

// User APIs
export const signIn = (data) => API.post('/users/signin', data);
export const signInGoogle = (accessToken) =>
  API.post('/users/signin', {
    googleAccessToken: accessToken,
  });

export const signUp = (data) => API.post('/users/signup', data);
export const signUpGoogle = (accessToken) =>
  API.post('/users/signup', {
    googleAccessToken: accessToken,
  });

export const getUser = (userId) => API.get(`/users/${userId}`);

//Task APIs
export const addTask = (newTask) => API.post('/tasks/', newTask);
export const getTasks = () => API.get('/tasks/');
export const updateTask = (taskId, update) =>
  API.put(`/tasks/${taskId}`, update);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
