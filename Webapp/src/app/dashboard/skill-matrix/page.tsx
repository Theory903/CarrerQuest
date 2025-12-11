// src/pages/skill-matrix.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import SkillMatrix from '@/components/Dashboard/SkillMatrix';

const SkillMatrixPage: React.FC = () => {
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
              Skill Matrix
            </h1>
            <p className="text-slate-400">
              Analyze your skills and identify areas for growth
            </p>
          </div>

          {/* Dashboard-specific Navigation */}
          <DashboardNavbar />

          {/* Main Content with gap */}
          <div className="card-elevated p-0 overflow-hidden mt-8">
            <SkillMatrix />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SkillMatrixPage;
