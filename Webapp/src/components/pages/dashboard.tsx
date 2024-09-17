import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import CareerInterestRadar from '@/components/Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '@/components/Dashboard/StrengthsWeaknessesBarChart';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Dashboard Content */}
      <div className="container mx-auto p-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to Your CareerQuest Dashboard</h2>
        </div>

        {/* Dashboard-specific Navigation */}
        <DashboardNavbar />

        {/* Dashboard Overview Content */}
        <div>
          <CareerInterestRadar />
          <StrengthsWeaknessesBarChart />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
