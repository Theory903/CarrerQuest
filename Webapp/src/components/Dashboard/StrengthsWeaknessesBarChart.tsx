"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  LabelList,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface SubjectData {
  subject: string;
  score: number;
  type: "strength" | "weakness";
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: SubjectData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { subject, score, type } = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg shadow-md">
        <p className="font-semibold text-lg">{subject}</p>
        <p>
          Score: <span className="font-medium">{score}</span>
        </p>
        <p>
          Type: <span className="capitalize font-medium">{type}</span>
        </p>
      </div>
    );
  }
  return null;
};

const SortSelect: React.FC<{
  sortBy: "score" | "alphabetical";
  onSortChange: (value: "score" | "alphabetical") => void;
}> = ({ sortBy, onSortChange }) => (
  <Select onValueChange={onSortChange} value={sortBy}>
    <SelectTrigger className="w-48 bg-gray-700 text-white border border-gray-600 rounded-md">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 text-white border-gray-700 rounded-md shadow-lg">
      <SelectItem value="score" className="hover:bg-gray-700">
        Sort by Score
      </SelectItem>
      <SelectItem value="alphabetical" className="hover:bg-gray-700">
        Sort Alphabetically
      </SelectItem>
    </SelectContent>
  </Select>
);

const StrengthsWeaknessesChart: React.FC<{ data: SubjectData[] }> = ({
  data,
}) => {
  const getBarColor = (type: "strength" | "weakness") =>
    type === "strength" ? "#22c55e" : "#ef4444"; // Updated colors for better contrast

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 40, left: 80, bottom: 20 }}
      >
        <XAxis type="number" domain={[0, 100]} stroke="#d1d5db" />
        <YAxis
          type="category"
          dataKey="subject"
          width={120}
          stroke="#d1d5db"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="score" name="Score">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
          ))}
          <LabelList dataKey="score" position="right" fill="#d1d5db" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const StrengthsWeaknessesDashboard: React.FC = () => {
  const [data, setData] = useState<SubjectData[]>([]);
  const [sortBy, setSortBy] = useState<"score" | "alphabetical">("score");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamically fetch API URL from environment variables
  const apiUrl =
    `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/subjects`;

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const sortData = (method: "score" | "alphabetical") => {
    const sortedData = [...data].sort((a, b) =>
      method === "score" ? b.score - a.score : a.subject.localeCompare(b.subject)
    );
    setData(sortedData);
    setSortBy(method);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(apiUrl); // Fetch original data from backend
      setData(response.data);
      setSortBy("score");
    } catch (error) {
      console.error("Failed to reset data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold mb-6">
          Strengths and Weaknesses
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Use the dropdown to sort the data by score or alphabetically.
          </p>
          <SortSelect sortBy={sortBy} onSortChange={sortData} />
        </div>
      </CardHeader>
      <CardContent>
        <StrengthsWeaknessesChart data={data} />
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600 rounded-md px-4 py-2"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknessesDashboard;