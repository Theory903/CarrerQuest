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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

interface InterestData {
  category: string;
  score: number;
  fullMark: number;
}

const defaultChartColors = {
  area: "#8884d8",
  stroke: "#8884d8",
  grid: "#545454",
  text: "#e0e0e0",
};

const CareerInterestRadar: React.FC = () => {
  const [data, setData] = useState<InterestData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5001"}/api/interests`;

  useEffect(() => {
    console.log("useEffect triggered, attempting to fetch data."); // Logs when useEffect is called
    const fetchData = async () => {
      console.log("API URL:", apiUrl); // Logs the API URL being used
      try {
        const response = await axios.get(apiUrl);
        console.log("API Response Data:", response.data); // Logs the fetched data
        setData(response.data);
        console.log("Updated data state:", response.data); // Logs updated data
        setError(null); // Clear any previous errors
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Failed to fetch data from the backend:", err.response || err.message);
        } else {
          console.error("Failed to fetch data from the backend:", err);
        }
        setError("Failed to load data. Please try again.");
        console.error("Error state set:", "Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
        console.log("Fetch attempt completed."); // Logs when the fetch completes
      }
    };

    fetchData();
  }, [apiUrl]);

  if (isLoading) {
    console.log("Loading state active. Displaying loading message.");
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-lg">Loading data...</p>
      </div>
    );
  }

  if (error) {
    console.log("Error detected. Displaying error message:", error);
    return (
      <div className="flex flex-col justify-center items-center h-full text-white">
        <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  console.log("Rendering chart with data:", data);
  return (
    <Card className="bg-gray-900 text-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center mb-6">
          Career Interest Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-400">
            This chart displays your career interests based on the provided data.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid stroke={defaultChartColors.grid} />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: defaultChartColors.text }}
              axisLine={{ stroke: defaultChartColors.grid }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "dataMax"]}
              tick={{ fill: defaultChartColors.text }}
            />
            <Radar
              name="Interests"
              dataKey="score"
              stroke={defaultChartColors.stroke}
              fill={defaultChartColors.area}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CareerInterestRadar;