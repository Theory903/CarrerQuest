"use client";
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface InterestData {
  category: string;
  score: number;
}

const data: InterestData[] = [
  { category: 'STEM', score: 85 },
  { category: 'Arts', score: 60 },
  { category: 'Business', score: 75 },
  { category: 'Social Sciences', score: 70 },
  { category: 'Healthcare', score: 65 },
];

const CareerInterestRadar: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Career Interest Profile</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          {/* Typing explicitly */}
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar name="Interests" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CareerInterestRadar;