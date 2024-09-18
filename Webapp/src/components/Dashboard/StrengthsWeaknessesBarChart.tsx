"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button';

interface SubjectData {
  subject: string;
  score: number;
  type: 'strength' | 'weakness';
}

const initialData: SubjectData[] = [
  { subject: 'Mathematics', score: 90, type: 'strength' },
  { subject: 'Science', score: 80, type: 'strength' },
  { subject: 'Language Arts', score: 60, type: 'weakness' },
  { subject: 'Social Studies', score: 70, type: 'weakness' },
  { subject: 'Physical Education', score: 85, type: 'strength' },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 text-white p-2 rounded shadow-md">
        <p className="font-bold">{data.subject}</p>
        <p>Score: {data.score}</p>
        <p className="capitalize">Type: {data.type}</p>
      </div>
    );
  }
  return null;
};

const SortSelect: React.FC<{ sortBy: string; onSortChange: (value: 'score' | 'alphabetical') => void }> = ({ sortBy, onSortChange }) => (
  <Select onValueChange={onSortChange} value={sortBy}>
    <SelectTrigger className="w-[180px] bg-gray-700 text-white border-gray-600">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 text-white border-gray-700">
      <SelectItem value="score" className="hover:bg-gray-700">Sort by Score</SelectItem>
      <SelectItem value="alphabetical" className="hover:bg-gray-700">Sort Alphabetically</SelectItem>
    </SelectContent>
  </Select>
);

const StrengthsWeaknessesChart: React.FC<{ data: SubjectData[] }> = ({ data }) => {
  const getBarColor = (type: 'strength' | 'weakness') => 
    type === 'strength' ? '#4ade80' : '#f87171';

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={data} 
        layout="vertical" 
        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
      >
        <XAxis type="number" domain={[0, 100]} stroke="#e2e8f0" />
        <YAxis type="category" dataKey="subject" width={100} stroke="#e2e8f0" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="score" name="Score">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
          ))}
          <LabelList dataKey="score" position="right" fill="#e2e8f0" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const StrengthsWeaknessesDashboard: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState<'score' | 'alphabetical'>('score');

  const sortData = (method: 'score' | 'alphabetical') => {
    const sortedData = [...data].sort((a, b) => {
      if (method === 'score') {
        return b.score - a.score;
      } else {
        return a.subject.localeCompare(b.subject);
      }
    });
    setData(sortedData);
    setSortBy(method);
  };

  const handleReset = () => {
    setData(initialData);
    setSortBy('score');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">Strengths and Weaknesses</CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-300">
            Click on 'Sort by' to change the order.
          </p>
          <SortSelect sortBy={sortBy} onSortChange={sortData} />
        </div>
      </CardHeader>
      <CardContent>
        <StrengthsWeaknessesChart data={data} />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleReset} variant="outline" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknessesDashboard;