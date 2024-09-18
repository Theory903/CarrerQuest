"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

const chartColors = {
  Mathematics: '#8884d8',
  Science: '#82ca9d',
  English: '#ffc658',
  History: '#ff7300',
};

const AcademicPerformanceLineChart: React.FC = () => {
  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Academic Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid stroke="#545454" />
            <XAxis dataKey="year" tick={{ fill: '#e0e0e0' }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#e0e0e0' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} 
              itemStyle={{ color: '#ffffff' }} 
            />
            <Legend />
            <Line type="monotone" dataKey="Mathematics" stroke={chartColors.Mathematics} />
            <Line type="monotone" dataKey="Science" stroke={chartColors.Science} />
            <Line type="monotone" dataKey="English" stroke={chartColors.English} />
            <Line type="monotone" dataKey="History" stroke={chartColors.History} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AcademicPerformanceLineChart;