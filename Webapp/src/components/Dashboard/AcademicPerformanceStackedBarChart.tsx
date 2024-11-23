"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

interface GradeData {
  year: string;
  Mathematics: number;
  Science: number;
  English: number;
  History: number;
}

const chartColors = {
  Mathematics: "#8884d8",
  Science: "#82ca9d",
  English: "#ffc658",
  History: "#ff7300",
};

const AcademicPerformanceStackedBarChart: React.FC = () => {
  const [data, setData] = useState<GradeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/academicPerformance`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendUrl);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>Loading academic performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Yearly Grade Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid stroke="#545454" />
            <XAxis dataKey="year" tick={{ fill: "#e0e0e0" }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#e0e0e0" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Legend />
            <Bar dataKey="Mathematics" stackId="a" fill={chartColors.Mathematics} />
            <Bar dataKey="Science" stackId="a" fill={chartColors.Science} />
            <Bar dataKey="English" stackId="a" fill={chartColors.English} />
            <Bar dataKey="History" stackId="a" fill={chartColors.History} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AcademicPerformanceStackedBarChart;