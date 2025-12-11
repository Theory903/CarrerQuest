"use client";

import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RefreshCw, AlertCircle, TrendingUp } from "lucide-react";

interface InterestData {
  category: string;
  score: number;
  fullMark: number;
}

// Fallback data when API fails
const fallbackData: InterestData[] = [
  { category: "STEM", score: 85, fullMark: 100 },
  { category: "Arts", score: 60, fullMark: 100 },
  { category: "Business", score: 75, fullMark: 100 },
  { category: "Social Sciences", score: 90, fullMark: 100 },
  { category: "Healthcare", score: 70, fullMark: 100 },
];

const chartColors = {
  area: "rgba(14, 165, 233, 0.4)",
  stroke: "#0ea5e9",
  grid: "rgba(148, 163, 184, 0.15)",
  text: "#94a3b8",
  dot: "#0ea5e9",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: InterestData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { category, score } = payload[0].payload;
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/60 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-white font-semibold mb-1">{category}</p>
        <p className="text-primary-400">
          Score: <span className="font-bold">{score}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-8">
    <div className="flex items-center justify-between mb-6">
      <div className="w-48 h-7 rounded skeleton" />
      <div className="w-24 h-6 rounded-full skeleton" />
    </div>
    <div className="flex items-center justify-center h-[350px]">
      <div className="w-64 h-64 rounded-full skeleton opacity-50" />
    </div>
  </div>
);

const CareerInterestRadar: React.FC = () => {
  const [data, setData] = useState<InterestData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"}/api/interests`;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result.length > 0 ? result : fallbackData);
      setIsOffline(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setData(fallbackData);
      setIsOffline(true);
      setError("Using cached data");
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

  const highestScore = Math.max(...data.map(d => d.score));
  const topCategory = data.find(d => d.score === highestScore)?.category || '';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Career Interest Profile</h3>
          <p className="text-slate-400 text-sm">Your interests across different fields</p>
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

      {/* Top Interest Badge */}
      <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
        <TrendingUp className="w-5 h-5 text-primary-400" />
        <span className="text-sm text-slate-300">
          Highest interest in <span className="text-primary-400 font-semibold">{topCategory}</span> ({highestScore}%)
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid 
            stroke={chartColors.grid} 
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: chartColors.text, fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: chartColors.grid }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: chartColors.text, fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Interest Score"
            dataKey="score"
            stroke={chartColors.stroke}
            fill={chartColors.area}
            fillOpacity={0.6}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: chartColors.dot,
              strokeWidth: 2,
              stroke: '#0f172a',
            }}
            activeDot={{
              r: 6,
              fill: chartColors.dot,
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend Info */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Higher = Stronger Interest
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            Scale: 0-100%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerInterestRadar;
