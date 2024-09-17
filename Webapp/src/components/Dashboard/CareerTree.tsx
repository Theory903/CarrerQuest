"use client";

import React, { useState } from 'react';

interface CareerNode {
  name: string;
  children?: CareerNode[];
  color?: string;
}

const careerTree: CareerNode[] = [
  {
    name: 'Technology',
    children: [
      { name: 'Software Development', color: '#8884d8' },
      { name: 'Data Science', color: '#82ca9d' },
      { name: 'Cybersecurity', color: '#ffc658' },
    ],
  },
  {
    name: 'Arts',
    children: [
      { name: 'Graphic Design', color: '#ff7300' },
      { name: 'Music', color: '#a4de6c' },
    ],
  },
  {
    name: 'Business',
    children: [
      { name: 'Marketing', color: '#d0ed57' },
      { name: 'Finance', color: '#a4de6c' },
    ],
  },
];

const CareerTree: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Career Recommendation Path</h2>
      <ul>
        {careerTree.map((node, index) => (
          <li key={index}>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => toggleExpand(node.name)}
            >
              <span className="mr-2">{expanded[node.name] ? '▼' : '▶'}</span>
              <span className="font-medium">{node.name}</span>
            </div>
            {expanded[node.name] && node.children && (
              <ul className="ml-6 mt-2">
                {node.children.map((child, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2">•</span>
                    <span style={{ color: child.color }}>{child.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerTree;
