"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

interface Goal {
  name: string;
  progress: number; // Percentage (0-100)
}

const GoalProgressTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/goals`;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(backendUrl);
        setGoals(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        setError("Failed to load goals. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-lg">Loading goals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

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