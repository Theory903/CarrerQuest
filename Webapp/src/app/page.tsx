"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/pages/dashboard';
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">      
        {/* Main content area for routing */}
        <main className="App-main">
          <Dashboard />
        </main>
      </div>
    </Router>
  );
};

export default App;
