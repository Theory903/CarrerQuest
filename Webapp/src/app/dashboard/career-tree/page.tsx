// src/pages/academic.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import CT from '@/components/Dashboard/CareerTree';

const Academic: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Career Tree</h2>
          <DashboardNavbar />
        </div>
        
        {/* Main Dashboard Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <CT />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Academic;
