"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { RefreshCw, AlertCircle, ArrowUpDown, RotateCcw } from "lucide-react";

interface SubjectData {
  subject: string;
  score: number;
  type: "strength" | "weakness";
}

// Fallback data
const fallbackData: SubjectData[] = [
  { subject: "Mathematics", score: 90, type: "strength" },
  { subject: "Science", score: 80, type: "strength" },
  { subject: "Language Arts", score: 60, type: "weakness" },
  { subject: "Social Studies", score: 70, type: "weakness" },
  { subject: "Physical Education", score: 85, type: "strength" },
];

const chartColors = {
  strength: "#10b981",
  weakness: "#f59e0b",
  strengthGradient: ["#10b981", "#059669"],
  weaknessGradient: ["#f59e0b", "#d97706"],
  grid: "rgba(148, 163, 184, 0.15)",
  text: "#94a3b8",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: SubjectData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { subject, score, type } = payload[0].payload;
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/60 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-white font-semibold mb-1">{subject}</p>
        <p className={type === "strength" ? "text-emerald-400" : "text-amber-400"}>
          Score: <span className="font-bold">{score}%</span>
        </p>
        <p className="text-slate-400 text-sm capitalize mt-1">
          {type}
        </p>
      </div>
    );
  }
  return null;
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-8">
    <div className="flex items-center justify-between mb-6">
      <div className="w-56 h-7 rounded skeleton" />
      <div className="w-32 h-8 rounded-lg skeleton" />
    </div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-24 h-5 rounded skeleton" />
          <div className="flex-1 h-8 rounded skeleton" style={{ width: `${80 - i * 10}%` }} />
        </div>
      ))}
    </div>
  </div>
);

const StrengthsWeaknessesDashboard: React.FC = () => {
  const [data, setData] = useState<SubjectData[]>([]);
  const [originalData, setOriginalData] = useState<SubjectData[]>([]);
  const [sortBy, setSortBy] = useState<"score" | "alphabetical">("score");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/subjects`;

  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      const finalData = result.length > 0 ? result : fallbackData;
      setData(finalData);
      setOriginalData(finalData);
      setIsOffline(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData(fallbackData);
      setOriginalData(fallbackData);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (method: "score" | "alphabetical") => {
    const sortedData = [...data].sort((a, b) =>
      method === "score" ? b.score - a.score : a.subject.localeCompare(b.subject)
    );
    setData(sortedData);
    setSortBy(method);
  };

  const handleReset = () => {
    setData([...originalData]);
    setSortBy("score");
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const strengths = data.filter(d => d.type === "strength").length;
  const weaknesses = data.filter(d => d.type === "weakness").length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Strengths & Weaknesses</h3>
          <p className="text-slate-400 text-sm">Your performance across subjects</p>
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
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Pills */}
      <div className="flex items-center gap-3 mb-6">
        <span className="badge-success">
          {strengths} Strengths
        </span>
        <span className="badge-accent">
          {weaknesses} Areas to Improve
        </span>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => sortData("score")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            sortBy === "score"
              ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          By Score
        </button>
        <button
          onClick={() => sortData("alphabetical")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            sortBy === "alphabetical"
              ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          A-Z
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            stroke={chartColors.text}
            tick={{ fill: chartColors.text, fontSize: 11 }}
            axisLine={{ stroke: chartColors.grid }}
            tickLine={{ stroke: chartColors.grid }}
          />
          <YAxis
            type="category"
            dataKey="subject"
            width={100}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} />
          <Bar 
            dataKey="score" 
            radius={[0, 8, 8, 0]}
            barSize={28}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.type === "strength" ? chartColors.strength : chartColors.weakness}
              />
            ))}
            <LabelList 
              dataKey="score" 
              position="right" 
              fill={chartColors.text}
              fontSize={12}
              fontWeight={600}
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Strength (70%+)</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-400">Area to Improve (&lt;70%)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrengthsWeaknessesDashboard;
