"use client"
import React from 'react';

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
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Skill Matrix</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Skill</th>
            <th className="px-4 py-2">Level</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{skill.name}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 text-white rounded ${getColor(skill.level)}`}>
                  {skill.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillMatrix;
