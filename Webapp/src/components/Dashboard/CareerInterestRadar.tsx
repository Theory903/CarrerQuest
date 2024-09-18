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

interface InterestData {
  category: string;
  score: number;
  fullMark: number;
}

interface CareerInterestRadarProps {
  initialData?: InterestData[];
  title?: string;
  chartColors?: {
    area: string;
    stroke: string;
    grid: string;
    text: string;
  };
  onDataChange?: (newData: InterestData[]) => void;
}

const defaultInitialData: InterestData[] = [
  { category: 'STEM', score: 0, fullMark: 100 },
  { category: 'Arts', score: 0, fullMark: 100 },
  { category: 'Business', score: 0, fullMark: 100 },
  { category: 'Social Sciences', score: 0, fullMark: 100 },
  { category: 'Healthcare', score: 0, fullMark: 100 },
];

const defaultChartColors = {
  area: '#8884d8',
  stroke: '#8884d8',
  grid: '#545454',
  text: '#e0e0e0',
};

const CareerInterestRadar: React.FC<CareerInterestRadarProps> = ({
  initialData = defaultInitialData,
  title = "Career Interest Profile",
  chartColors = defaultChartColors,
  onDataChange,
}) => {
  const [data, setData] = useState<InterestData[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleCategoryClick = (category: string) => {
    const newData = data.map(item =>
      item.category === category
        ? { ...item, score: Math.min(item.score + 5, item.fullMark) }
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
            Click on a category to increase its score. Hover over the chart to see details.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={data}>
            <PolarGrid stroke={chartColors.grid} />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: chartColors.text }}
              axisLine={{ stroke: chartColors.grid }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 'dataMax']} 
              tick={{ fill: chartColors.text }} 
            />
            <Radar
              name="Interests"
              dataKey="score"
              stroke={chartColors.stroke}
              fill={chartColors.area}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item) => (
            <Button
              key={item.category}
              onClick={() => handleCategoryClick(item.category)}
              onMouseEnter={() => setHoveredCategory(item.category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`bg-gray-700 hover:bg-gray-600 ${
                hoveredCategory === item.category ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {item.category}: {item.score}
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

export default CareerInterestRadar;