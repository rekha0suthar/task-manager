import React from 'react';
import Router from './router/Router';
import './App.css';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
