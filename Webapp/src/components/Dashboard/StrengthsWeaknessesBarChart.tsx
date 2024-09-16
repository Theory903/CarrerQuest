"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SubjectData {
  subject: string;
  score: number;
  type: 'strength' | 'weakness';
}

const data: SubjectData[] = [
  { subject: 'Mathematics', score: 90, type: 'strength' },
  { subject: 'Science', score: 80, type: 'strength' },
  { subject: 'Language Arts', score: 60, type: 'weakness' },
  { subject: 'Social Studies', score: 70, type: 'weakness' },
  { subject: 'Physical Education', score: 85, type: 'strength' },
];

const StrengthsWeaknessesBarChart: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Strengths and Weaknesses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="subject" />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#82ca9d" name="Strength" />
          <Bar dataKey="score" fill="#ff6961" name="Weakness" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrengthsWeaknessesBarChart;
