"use client";

import React, { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'; // For icons
import { Tooltip } from 'react-tooltip'; // For tooltips

interface CareerNode {
  name: string;
  description?: string;
  children?: CareerNode[];
  color?: string;
}

const careerTree: CareerNode[] = [
  {
    name: 'Technology',
    description: 'Explore cutting-edge technology fields.',
    children: [
      { name: 'Software Development', color: '#8884d8', description: 'Create and maintain software applications.' },
      { name: 'Data Science', color: '#82ca9d', description: 'Analyze and interpret complex data.' },
      { name: 'Cybersecurity', color: '#ffc658', description: 'Protect systems and data from cyber threats.' },
    ],
  },
  {
    name: 'Arts',
    description: 'Express creativity and explore artistic fields.',
    children: [
      { name: 'Graphic Design', color: '#ff7300', description: 'Design visual content for various media.' },
      { name: 'Music', color: '#a4de6c', description: 'Create and perform music in various genres.' },
    ],
  },
  {
    name: 'Business',
    description: 'Engage in business and management activities.',
    children: [
      { name: 'Marketing', color: '#d0ed57', description: 'Promote products and services to customers.' },
      { name: 'Finance', color: '#a4de6c', description: 'Manage and analyze financial resources.' },
    ],
  },
];

const CareerTree: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-white mb-6">Career Recommendation Path</h2>
      <ul className="text-gray-300">
        {careerTree.map((node, index) => (
          <li key={index} className="mb-4">
            <div
              className="cursor-pointer flex items-center hover:text-blue-400 transition-colors"
              onClick={() => toggleExpand(node.name)}
              role="button"
              aria-expanded={expanded[node.name]}
              aria-controls={`child-list-${index}`}
            >
              <span className="mr-3 text-gray-500">
                {expanded[node.name] ? <FaCaretDown /> : <FaCaretRight />}
              </span>
              <span className="text-lg font-semibold">{node.name}</span>
              {node.description && (
                <Tooltip
                  content={node.description}
                  className="ml-2 text-sm text-gray-400"
                  placement="right"
                >
                  <span className="text-gray-400">(i)</span>
                </Tooltip>
              )}
            </div>
            {expanded[node.name] && node.children && (
              <ul
                id={`child-list-${index}`}
                className="ml-6 mt-2 border-l border-gray-700 pl-4"
              >
                {node.children.map((child, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <span className="mr-3 text-gray-500">•</span>
                    <span className="text-sm" style={{ color: child.color }}>
                      {child.name}
                    </span>
                    {child.description && (
                      <Tooltip
                        content={child.description}
                        className="ml-2 text-xs text-gray-400"
                        placement="right"
                      >
                        <span className="text-gray-400">(i)</span>
                      </Tooltip>
                    )}
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