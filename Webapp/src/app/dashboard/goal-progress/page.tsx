"use client";

import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import GoalProgressTracker from '@/components/Dashboard/GoalProgressTracker';

const GoalProgressPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Goal Progress
            </h1>
            <p className="text-slate-400">
              Track your career milestones and achievements
            </p>
          </div>

          <DashboardNavbar />
          
          <div className="card-elevated p-0 overflow-hidden mt-8">
            <GoalProgressTracker />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GoalProgressPage;
