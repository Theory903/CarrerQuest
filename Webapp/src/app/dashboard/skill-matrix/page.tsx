// src/pages/skill-matrix.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import SkillMatrix from '@/components/Dashboard/SkillMatrix';

const SkillMatrixPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Page Header */}
        <header className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Skill Matrix</h2>
        </header>

        {/* Dashboard-specific Navigation */}
        <DashboardNavbar />

        {/* Main Content with gap */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
          <SkillMatrix />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SkillMatrixPage;
