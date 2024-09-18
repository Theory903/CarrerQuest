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
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PersonalityData {
  trait: string;
  score: number;
}

interface PersonalityRadarProps {
  initialData?: PersonalityData[];
  title?: string;
  chartColors?: {
    area: string;
    stroke: string;
    grid: string;
    text: string;
  };
  onDataChange?: (newData: PersonalityData[]) => void;
}

const defaultInitialData: PersonalityData[] = [
  { trait: 'Openness', score: 80 },
  { trait: 'Conscientiousness', score: 70 },
  { trait: 'Extraversion', score: 60 },
  { trait: 'Agreeableness', score: 75 },
  { trait: 'Neuroticism', score: 40 },
];

const defaultChartColors = {
  area: '#8884d8',
  stroke: '#8884d8',
  grid: '#4b5563',
  text: '#e5e7eb',
};

const PersonalityRadarChart: React.FC<PersonalityRadarProps> = ({
  initialData = defaultInitialData,
  title = "Personality Insights",
  chartColors = defaultChartColors,
  onDataChange,
}) => {
  const [data, setData] = useState<PersonalityData[]>(initialData);
  const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleTraitClick = (trait: string) => {
    const newData = data.map(item =>
      item.trait === trait
        ? { ...item, score: Math.min(item.score + 5, 100) }
        : item
    );
    setData(newData);
    onDataChange?.(newData);
  };

  const handleReset = () => {
    setData(initialData);
    onDataChange?.(initialData);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-gray-300">
            Click on a trait to increase its score. Hover over the chart to see details.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={data}>
            <PolarGrid stroke={chartColors.grid} />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.grid }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: chartColors.text }}
            />
            <Radar
              name="Personality Traits"
              dataKey="score"
              stroke={chartColors.stroke}
              fill={chartColors.area}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Legend
              wrapperStyle={{ top: 0, left: 'center', margin: '0 auto' }}
              verticalAlign="top"
              iconType="circle"
              formatter={(value) => <span className="text-white">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item) => (
            <Button
              key={item.trait}
              onClick={() => handleTraitClick(item.trait)}
              onMouseEnter={() => setHoveredTrait(item.trait)}
              onMouseLeave={() => setHoveredTrait(null)}
              className={`bg-gray-700 hover:bg-gray-600 ${
                hoveredTrait === item.trait ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {item.trait}: {item.score}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={handleReset} variant="outline">
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityRadarChart;