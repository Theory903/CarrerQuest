"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { RefreshCw, AlertCircle, TrendingUp } from "lucide-react";

interface PerformanceData {
  year: string;
  Mathematics: number;
  Science: number;
  English: number;
  History: number;
}

// Fallback data
const fallbackData: PerformanceData[] = [
  { year: "2020", Mathematics: 75, Science: 80, English: 70, History: 65 },
  { year: "2021", Mathematics: 78, Science: 82, English: 73, History: 70 },
  { year: "2022", Mathematics: 82, Science: 85, English: 78, History: 75 },
  { year: "2023", Mathematics: 88, Science: 87, English: 82, History: 80 },
  { year: "2024", Mathematics: 92, Science: 90, English: 85, History: 85 },
];

const chartColors = {
  Mathematics: "#0ea5e9",
  Science: "#10b981",
  English: "#f59e0b",
  History: "#8b5cf6",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/60 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="w-56 h-7 rounded skeleton" />
      <div className="w-8 h-8 rounded-lg skeleton" />
    </div>
    <div className="h-[350px] skeleton rounded-xl" />
  </div>
);

const AcademicPerformanceLineChart: React.FC = () => {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/academicPerformance`);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result.length > 0 ? result : fallbackData);
      setIsOffline(false);
    } catch (err) {
      console.error("Failed to fetch performance data:", err);
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

  // Calculate improvement
  const latestYear = data[data.length - 1];
  const previousYear = data[data.length - 2];
  const avgLatest = latestYear 
    ? (latestYear.Mathematics + latestYear.Science + latestYear.English + latestYear.History) / 4
    : 0;
  const avgPrevious = previousYear
    ? (previousYear.Mathematics + previousYear.Science + previousYear.English + previousYear.History) / 4
    : 0;
  const improvement = avgLatest - avgPrevious;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Performance Trends</h3>
          <p className="text-slate-400 text-sm">Track your academic progress over time</p>
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

      {/* Improvement Badge */}
      {improvement > 0 && (
        <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-sm text-slate-300">
            Average score improved by{' '}
            <span className="text-emerald-400 font-semibold">+{improvement.toFixed(1)}%</span>
            {' '}this year
          </span>
        </div>
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
          />
          {Object.entries(chartColors).map(([key, color]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#0f172a' }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Legend Info */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-4">
          {Object.entries(chartColors).map(([subject, color]) => (
            <span key={subject} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-slate-400">{subject}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicPerformanceLineChart;
