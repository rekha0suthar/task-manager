import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Signup from '../components/signup';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Router;
