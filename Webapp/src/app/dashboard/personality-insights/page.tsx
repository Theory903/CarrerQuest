// src/pages/personality-insights.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import PRC from '@/components/Dashboard/PersonalityRadarChart';

const PersonalityInsights: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Personality Insights</h2>
          <DashboardNavbar />
        </div>

        {/* Chart Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <PRC />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalityInsights;
