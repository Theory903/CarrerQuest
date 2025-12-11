"use client";

import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import CareerTree from '@/components/Dashboard/CareerTree';

const CareerTreePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Career Path Explorer
            </h1>
            <p className="text-slate-400">
              Discover career paths aligned with your interests
            </p>
          </div>

          <DashboardNavbar />
          
          <div className="card-elevated p-0 overflow-hidden mt-8">
            <CareerTree />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CareerTreePage;
