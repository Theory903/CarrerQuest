"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { RefreshCw, AlertCircle, Users, Trophy, BookOpen, Lightbulb } from "lucide-react";

interface ParticipationData {
  name: string;
  value: number;
}

// Fallback data
const fallbackData: ParticipationData[] = [
  { name: "Workshops", value: 35 },
  { name: "Quizzes", value: 45 },
  { name: "Mentorship Sessions", value: 15 },
  { name: "Career Events", value: 25 },
];

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6"];
const ICONS = [BookOpen, Trophy, Users, Lightbulb];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: { name: string } }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/60 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-white font-semibold">{payload[0].payload.name}</p>
        <p className="text-primary-400">
          Participation: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="w-48 h-7 rounded skeleton" />
      <div className="w-8 h-8 rounded-lg skeleton" />
    </div>
    <div className="flex items-center justify-center h-[350px]">
      <div className="w-48 h-48 rounded-full skeleton" />
    </div>
  </div>
);

const ParticipationDonutChart: React.FC = () => {
  const [data, setData] = useState<ParticipationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/participation`);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result.length > 0 ? result : fallbackData);
      setIsOffline(false);
    } catch (err) {
      console.error("Failed to fetch participation data:", err);
      setData(fallbackData);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Participation Overview</h3>
          <p className="text-slate-400 text-sm">Your engagement across platform activities</p>
        </div>
        <div className="flex items-center gap-2">
          {isOffline && (
            <span className="badge-accent text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Offline
            </span>
          )}
          <button
            onClick={fetchData}
            className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="drop-shadow-lg"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div 
                key={item.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 border border-slate-800/60"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: COLORS[index % COLORS.length] }} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-slate-500 text-sm">{item.value} activities</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                    {percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Trophy className="w-4 h-4" />
          <span>Total Activities: <span className="text-white font-semibold">{total}</span></span>
        </div>
      </div>
    </div>
  );
};

export default ParticipationDonutChart;
