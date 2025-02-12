import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Signup from '../components/signup';
import TodoList from '../components/todoList';
import { ProtectedRoute } from './ProtectedRoute';
import UserProfile from '../components/profile';
import ForgotPassword from '../components/forgotPassword';
import ResetPassword from '../components/ResetPassword';
import DashboardLayout from '../components/layout/DashboardLayout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<TodoList />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
