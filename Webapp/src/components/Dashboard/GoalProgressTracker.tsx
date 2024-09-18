"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Goal Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1 text-sm font-medium">
              <span>{goal.name}</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GoalProgressTracker;