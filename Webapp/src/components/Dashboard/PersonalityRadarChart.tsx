"use client";

import React, { useState, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RefreshCw, Brain, Sparkles, Heart, Zap, Eye } from "lucide-react";

interface PersonalityData {
  trait: string;
  score: number;
  description?: string;
}

const defaultData: PersonalityData[] = [
  { trait: 'Openness', score: 80, description: 'Curiosity and willingness to try new things' },
  { trait: 'Conscientiousness', score: 70, description: 'Organization and dependability' },
  { trait: 'Extraversion', score: 60, description: 'Sociability and assertiveness' },
  { trait: 'Agreeableness', score: 75, description: 'Cooperation and empathy' },
  { trait: 'Neuroticism', score: 40, description: 'Emotional stability (lower is better)' },
];

const traitIcons: { [key: string]: React.ElementType } = {
  'Openness': Eye,
  'Conscientiousness': Zap,
  'Extraversion': Sparkles,
  'Agreeableness': Heart,
  'Neuroticism': Brain,
};

const traitColors: { [key: string]: string } = {
  'Openness': '#8b5cf6',
  'Conscientiousness': '#0ea5e9',
  'Extraversion': '#f59e0b',
  'Agreeableness': '#10b981',
  'Neuroticism': '#ef4444',
};

const chartColors = {
  area: 'rgba(14, 165, 233, 0.4)',
  stroke: '#0ea5e9',
  grid: 'rgba(148, 163, 184, 0.15)',
  text: '#94a3b8',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: PersonalityData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { trait, score, description } = payload[0].payload;
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/60 px-4 py-3 rounded-xl shadow-xl max-w-xs">
        <p className="text-white font-semibold mb-1">{trait}</p>
        <p className="text-primary-400 mb-2">
          Score: <span className="font-bold">{score}%</span>
        </p>
        {description && (
          <p className="text-slate-400 text-sm">{description}</p>
        )}
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
      <div className="w-64 h-64 rounded-full skeleton opacity-50" />
    </div>
  </div>
);

const PersonalityRadarChart: React.FC = () => {
  const [data, setData] = useState<PersonalityData[]>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setData(defaultData);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Find dominant trait
  const dominantTrait = data.reduce((prev, current) => 
    (prev.score > current.score) ? prev : current
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Personality Profile</h3>
          <p className="text-slate-400 text-sm">Based on the Big Five personality model</p>
        </div>
        <button
          onClick={handleReset}
          className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Dominant Trait */}
      <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
        <Brain className="w-5 h-5 text-primary-400" />
        <span className="text-sm text-slate-300">
          Your dominant trait is{' '}
          <span className="text-primary-400 font-semibold">{dominantTrait.trait}</span>
          {' '}({dominantTrait.score}%)
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke={chartColors.grid} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="trait"
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
            name="Personality"
            dataKey="score"
            stroke={chartColors.stroke}
            fill={chartColors.area}
            fillOpacity={0.6}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: chartColors.stroke,
              strokeWidth: 2,
              stroke: '#0f172a',
            }}
            activeDot={{
              r: 6,
              fill: chartColors.stroke,
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      {/* Trait Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
        {data.map((item) => {
          const Icon = traitIcons[item.trait] || Brain;
          const color = traitColors[item.trait] || '#64748b';
          return (
            <div
              key={item.trait}
              className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/60 text-center"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p className="text-xs text-slate-400 mb-1 truncate">{item.trait}</p>
              <p className="text-lg font-bold" style={{ color }}>{item.score}%</p>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <p className="text-slate-500 text-xs text-center">
          Personality scores are based on your quiz responses and can be improved over time
        </p>
      </div>
    </div>
  );
};

export default PersonalityRadarChart;
