"use client"
import React from 'react';

interface Goal {
  name: string;
  progress: number; // Percentage (0-100)
}

const goals: Goal[] = [
  { name: 'Complete 10 Career Quizzes', progress: 70 },
  { name: 'Attend 5 Workshops', progress: 50 },
  { name: 'Complete Skill-Building Course', progress: 40 },
  { name: 'Earn Leadership Badge', progress: 30 },
];

const GoalProgressTracker: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Goal Progress Tracker</h2>
      {goals.map((goal, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-1">
            <span>{goal.name}</span>
            <span>{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalProgressTracker;
