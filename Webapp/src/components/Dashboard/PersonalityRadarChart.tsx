"use client"
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PersonalityData {
  trait: string;
  score: number;
}

const data: PersonalityData[] = [
  { trait: 'Openness', score: 80 },
  { trait: 'Conscientiousness', score: 70 },
  { trait: 'Extraversion', score: 60 },
  { trait: 'Agreeableness', score: 75 },
  { trait: 'Neuroticism', score: 40 },
];

const PersonalityRadarChart: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Personality Insights</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="trait" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Personality Traits" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalityRadarChart;
