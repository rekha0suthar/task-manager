import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { DemoProvider } from './context/DemoContext';

function App() {
  return (
    <ThemeProvider>
      <DemoProvider>
        <div className="App">
          <Router />
          <Toaster />
        </div>
      </DemoProvider>
    </ThemeProvider>
  );
}

export default App;
