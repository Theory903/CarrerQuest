// src/pages/academic.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import APLC from '@/components/Dashboard/AcademicPerformanceLineChart';
import APSBC from '@/components/Dashboard/AcademicPerformanceStackedBarChart';

const Academic: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Academic Performance
            </h1>
            <p className="text-slate-400">
              Track your academic progress and achievements
            </p>
          </div>

          {/* Dashboard Navigation */}
          <DashboardNavbar />
          
          {/* Dashboard Content */}
          <div className="grid gap-8 mt-8">
            <div className="card-elevated p-0 overflow-hidden">
              <APLC />
            </div>
            <div className="card-elevated p-0 overflow-hidden">
              <APSBC />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Academic;
