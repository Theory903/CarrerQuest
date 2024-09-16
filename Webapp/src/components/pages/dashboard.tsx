import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CareerInterestRadar from '../Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '../Dashboard/StrengthsWeaknessesBarChart';
import SkillMatrix from '../Dashboard/SkillMatrix';
import AcademicPerformanceLineChart from '../Dashboard/AcademicPerformanceLineChart';
import AcademicPerformanceStackedBarChart from '../Dashboard/AcademicPerformanceStackedBarChart';
import ParticipationDonutChart from '../Dashboard/ParticipationDonutChart';
import GoalProgressTracker from '../Dashboard/GoalProgressTracker';
import CareerTree from '../Dashboard/CareerTree';
import PersonalityRadarChart from '../Dashboard/PersonalityRadarChart';
import ReflectionTimeline from '../Dashboard/ReflectionTimeline';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 align-middle">Welcome to Your CareerQuest Dashboard</h2>
        </div>

        {/* Career Interest Profile */}
        <CareerInterestRadar />

        {/* Strengths and Weaknesses */}
        <StrengthsWeaknessesBarChart />

        {/* Skill Matrix */}
        <SkillMatrix />

        {/* Academic Performance Over Time */}
        <AcademicPerformanceLineChart />

        {/* Yearly Grade Breakdown */}
        <AcademicPerformanceStackedBarChart />

        {/* Participation Levels */}
        <ParticipationDonutChart />

        {/* Goal Progress Tracker */}
        <GoalProgressTracker />

        {/* Career Recommendation Path */}
        <CareerTree />

        {/* Personality Insights */}
        <PersonalityRadarChart />

        {/* Reflection Journals */}
        <ReflectionTimeline />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
