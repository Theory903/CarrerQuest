// src/pages/participation-levels.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import PDC from '@/components/Dashboard/ParticipationDonutChart';

const ParticipationLevels: React.FC = () => {
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
              Participation Levels
            </h1>
            <p className="text-slate-400">
              View your engagement and participation metrics
            </p>
          </div>

          {/* Dashboard Navigation */}
          <DashboardNavbar />
          
          {/* Dashboard Content */}
          <div className="card-elevated p-0 overflow-hidden mt-8">
            <PDC />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ParticipationLevels;
