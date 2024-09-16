"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GradeData {
  year: string;
  Mathematics: number;
  Science: number;
  English: number;
  History: number;
}

const data: GradeData[] = [
  { year: 'Year 9', Mathematics: 75, Science: 80, English: 70, History: 65 },
  { year: 'Year 10', Mathematics: 80, Science: 85, English: 72, History: 68 },
  { year: 'Year 11', Mathematics: 85, Science: 90, English: 74, History: 70 },
  { year: 'Year 12', Mathematics: 90, Science: 95, English: 70, History: 60 },
];

const AcademicPerformanceStackedBarChart: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Yearly Grade Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Mathematics" stackId="a" fill="#8884d8" />
          <Bar dataKey="Science" stackId="a" fill="#82ca9d" />
          <Bar dataKey="English" stackId="a" fill="#ffc658" />
          <Bar dataKey="History" stackId="a" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AcademicPerformanceStackedBarChart;
