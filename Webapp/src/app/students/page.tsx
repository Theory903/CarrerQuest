"use client";
import React from 'react';
import StudentForm from '../../components/pages/StudentForm';
const APP: React.FC = () => {
  return (
          <div className="App">      
            {/* Main content area for routing */}
            <main className="App-main">
              <StudentForm />
            </main>
          </div>

      );
    };
export default APP;
