"use client"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ParticipationData {
  name: string;
  value: number;
}

const data: ParticipationData[] = [
  { name: 'Quizzes Completed', value: 40 },
  { name: 'Workshops Attended', value: 30 },
  { name: 'Group Projects', value: 20 },
  { name: 'Mentorship Sessions', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ParticipationDonutChart: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Participation Levels</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipationDonutChart;
