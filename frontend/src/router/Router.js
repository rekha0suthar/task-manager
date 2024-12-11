import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Signup from '../components/signup';
import TodoList from '../components/todoList';
import { ProtectedRoute } from './ProtectedRoute';
import UserProfile from '../components/profile';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<TodoList />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default Router;
