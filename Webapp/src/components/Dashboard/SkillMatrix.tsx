"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Skill {
  name: string;
  level: 'Developing' | 'Proficient' | 'Expert';
}

const skills: Skill[] = [
  { name: 'Critical Thinking', level: 'Expert' },
  { name: 'Communication', level: 'Proficient' },
  { name: 'Problem Solving', level: 'Developing' },
  { name: 'Creativity', level: 'Proficient' },
  { name: 'Time Management', level: 'Expert' },
];

const getColor = (level: string) => {
  switch (level) {
    case 'Developing':
      return 'bg-yellow-400';
    case 'Proficient':
      return 'bg-blue-400';
    case 'Expert':
      return 'bg-green-400';
    default:
      return 'bg-gray-200';
  }
};

const SkillMatrix: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Developing' | 'Proficient' | 'Expert'>('All');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'All' | 'Developing' | 'Proficient' | 'Expert');
  };

  const filteredSkills = filter === 'All' ? skills : skills.filter(skill => skill.level === filter);

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Skill Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filter Dropdown */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Filter by Level:</p>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Developing">Developing</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Skill Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-200">Skill</th>
              <th className="px-4 py-2 text-gray-200">Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.map((skill, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2 text-gray-300">{skill.name}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 text-black text-bold rounded ${getColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <Button onClick={() => setFilter('All')} variant="outline">
            Reset Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillMatrix;