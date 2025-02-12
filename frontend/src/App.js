import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
