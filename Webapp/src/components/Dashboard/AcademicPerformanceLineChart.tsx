"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceData {
  year: string;
  Mathematics: number;
  Science: number;
  English: number;
  History: number;
}

const data: PerformanceData[] = [
  { year: 'Year 9', Mathematics: 75, Science: 80, English: 70, History: 65 },
  { year: 'Year 10', Mathematics: 80, Science: 85, English: 72, History: 68 },
  { year: 'Year 11', Mathematics: 85, Science: 90, English: 74, History: 70 },
  { year: 'Year 12', Mathematics: 90, Science: 95, English: 70, History: 60 },
];

const AcademicPerformanceLineChart: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Academic Performance Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="year"/>
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Mathematics" stroke="#8884d8" />
          <Line type="monotone" dataKey="Science" stroke="#82ca9d" />
          <Line type="monotone" dataKey="English" stroke="#ffc658" />
          <Line type="monotone" dataKey="History" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AcademicPerformanceLineChart;
