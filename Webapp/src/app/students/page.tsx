// src/app/page.tsx or src/pages/index.tsx
"use client";
import React from 'react';
import StudentForm from '@/components/pages/StudentForm';

const Page: React.FC = () => {
  return (
    <div className="App">
      <main className="App-main">
        <StudentForm />
      </main>
    </div>
  );
};

export default Page;
