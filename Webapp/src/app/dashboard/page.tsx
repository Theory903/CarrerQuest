// src/pages/dashboard.tsx
"use client";
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import CareerInterestRadar from '@/components/Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '@/components/Dashboard/StrengthsWeaknessesBarChart';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Dashboard Header */}
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to Your CareerQuest Dashboard</h2>
        </header>

        {/* Dashboard-specific Navigation */}
        <DashboardNavbar />

        {/* Dashboard Overview Content */}
        <section className="grid gap-8 md:grid-cols-2 p-8">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <CareerInterestRadar />
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <StrengthsWeaknessesBarChart />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
