// src/pages/academic.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import APLC from '@/components/Dashboard/AcademicPerformanceLineChart';
import APSBC from '@/components/Dashboard/AcademicPerformanceStackedBarChart';

const Academic: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Page Header */}
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Academic Performance</h2>
          <DashboardNavbar />
        </header>
        
        {/* Dashboard Content */}
        <section className=" bg-gray-800 p-6 rounded-lg shadow-lg">
          <APLC />
          <APSBC />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Academic;
