"use client";

import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import CareerInterestRadar from '@/components/Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '@/components/Dashboard/StrengthsWeaknessesBarChart';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  changeType = 'neutral',
  gradient 
}) => (
  <div className="card-elevated">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {change && (
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-emerald-400' :
          changeType === 'negative' ? 'text-red-400' : 'text-slate-400'
        }`}>
          {change}
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const QuickActionCard: React.FC<{ 
  href: string; 
  title: string; 
  description: string;
  icon: React.ElementType;
}> = ({ href, title, description, icon: Icon }) => (
  <Link href={href} className="card-elevated group flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
      <Icon className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transition-colors" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-white font-medium group-hover:text-primary-400 transition-colors">{title}</h4>
      <p className="text-slate-500 text-sm truncate">{description}</p>
    </div>
    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
  </Link>
);

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-slate-400">
                Track your progress and discover new opportunities
              </p>
            </div>
            <Link href="/aimentor" className="btn-primary inline-flex self-start">
              <Sparkles className="w-5 h-5 mr-2" />
              Ask AI Mentor
            </Link>
          </div>

          {/* Dashboard Navigation */}
          <DashboardNavbar />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={TrendingUp}
              label="Career Match Score"
              value="87%"
              change="+5%"
              changeType="positive"
              gradient="from-primary-500 to-primary-600"
            />
            <StatCard
              icon={Target}
              label="Goals Completed"
              value="12/15"
              change="3 pending"
              changeType="neutral"
              gradient="from-emerald-500 to-emerald-600"
            />
            <StatCard
              icon={Award}
              label="Skills Assessed"
              value="24"
              change="+3 new"
              changeType="positive"
              gradient="from-purple-500 to-purple-600"
            />
            <StatCard
              icon={Calendar}
              label="Active Streak"
              value="7 Days"
              change="Personal best!"
              changeType="positive"
              gradient="from-orange-500 to-orange-600"
            />
          </div>

          {/* Main Charts Grid */}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            <div className="card-elevated p-0 overflow-hidden">
              <CareerInterestRadar />
            </div>
            <div className="card-elevated p-0 overflow-hidden">
              <StrengthsWeaknessesBarChart />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <QuickActionCard
                href="/quiz"
                title="Take Career Quiz"
                description="Discover new career matches"
                icon={Target}
              />
              <QuickActionCard
                href="/dashboard/skill-matrix"
                title="View Skill Matrix"
                description="Analyze your skill gaps"
                icon={TrendingUp}
              />
              <QuickActionCard
                href="/mentorships"
                title="Find a Mentor"
                description="Connect with industry experts"
                icon={Award}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
