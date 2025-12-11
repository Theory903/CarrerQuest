"use client";

import React, { useEffect, useState } from "react";
import { Target, RefreshCw, AlertCircle, CheckCircle2, Trophy } from "lucide-react";

interface Goal {
  name: string;
  progress: number;
}

// Fallback data when API fails
const fallbackGoals: Goal[] = [
  { name: "Complete Career Assessment Quiz", progress: 100 },
  { name: "Connect with 3 Mentors", progress: 66 },
  { name: "Explore 5 Career Paths", progress: 80 },
  { name: "Complete Skill Assessment", progress: 45 },
  { name: "Attend Industry Webinar", progress: 0 },
];

const getProgressColor = (progress: number): string => {
  if (progress === 100) return "bg-emerald-500";
  if (progress >= 70) return "bg-primary-500";
  if (progress >= 40) return "bg-amber-500";
  return "bg-slate-600";
};

const getProgressGradient = (progress: number): string => {
  if (progress === 100) return "from-emerald-500 to-emerald-400";
  if (progress >= 70) return "from-primary-500 to-primary-400";
  if (progress >= 40) return "from-amber-500 to-amber-400";
  return "from-slate-600 to-slate-500";
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-48 h-7 rounded skeleton" />
      <div className="w-8 h-8 rounded-lg skeleton" />
    </div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="flex justify-between">
          <div className="w-48 h-5 rounded skeleton" />
          <div className="w-12 h-5 rounded skeleton" />
        </div>
        <div className="w-full h-3 rounded-full skeleton" />
      </div>
    ))}
  </div>
);

const GoalProgressTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/goals`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setGoals(data.length > 0 ? data : fallbackGoals);
      setIsOffline(false);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
      setGoals(fallbackGoals);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const completedGoals = goals.filter(g => g.progress === 100).length;
  const totalProgress = Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Goal Progress</h3>
          <p className="text-slate-400 text-sm">Track your career milestones</p>
        </div>
        <div className="flex items-center gap-2">
          {isOffline && (
            <span className="badge-accent text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Offline
            </span>
          )}
          <button
            onClick={fetchGoals}
            className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedGoals}/{goals.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary-400" />
            <span className="text-slate-400 text-sm">Overall</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalProgress}%</p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-5">
        {goals.map((goal, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {goal.progress === 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    goal.progress >= 70 ? 'border-primary-400' : 
                    goal.progress >= 40 ? 'border-amber-400' : 'border-slate-600'
                  }`} />
                )}
                <span className={`text-sm font-medium ${
                  goal.progress === 100 ? 'text-slate-400 line-through' : 'text-slate-200'
                }`}>
                  {goal.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${
                goal.progress === 100 ? 'text-emerald-400' :
                goal.progress >= 70 ? 'text-primary-400' :
                goal.progress >= 40 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {goal.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(goal.progress)} transition-all duration-500`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Complete
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            On Track
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            Not Started
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressTracker;
