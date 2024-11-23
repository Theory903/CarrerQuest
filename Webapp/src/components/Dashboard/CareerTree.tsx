"use client";

import React, { useState, useEffect } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import axios from "axios";

interface CareerNode {
  name: string;
  description?: string;
  children?: CareerNode[];
  color?: string;
}

const CareerTree: React.FC = () => {
  const [careerTree, setCareerTree] = useState<CareerNode[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

  // Fetch Career Tree Data
  useEffect(() => {
    const fetchCareerTree = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/careerTree`);
        setCareerTree(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch career tree data:", err);
        setError("Failed to load career tree. Please try again.");
      }
    };

    fetchCareerTree();
  }, [backendUrl]);

  // Toggle Expand/Collapse for Tree Nodes
  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!careerTree.length) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>Loading Career Tree...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-md mt-8">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
        Career Recommendation Path
      </h2>
      <ul className="text-gray-300 space-y-6">
        {careerTree.map((node, index) => (
          <TreeNode
            key={index}
            node={node}
            expanded={expanded[node.name] || false}
            toggleExpand={toggleExpand}
          />
        ))}
      </ul>
    </div>
  );
};

// Tree Node Component
const TreeNode: React.FC<{
  node: CareerNode;
  expanded: boolean;
  toggleExpand: (name: string) => void;
}> = ({ node, expanded, toggleExpand }) => {
  return (
    <li className="group">
      <div
        className="cursor-pointer flex items-center hover:text-blue-400 transition-colors duration-200"
        onClick={() => toggleExpand(node.name)}
        role="button"
        aria-expanded={expanded}
        aria-controls={`child-list-${node.name}`}
      >
        <span className="mr-4 text-gray-400 group-hover:text-blue-400">
          {expanded ? <FaCaretDown /> : <FaCaretRight />}
        </span>
        <span className="text-lg font-semibold">{node.name}</span>
        {node.description && (
          <Tooltip content={node.description} className="ml-2 text-sm">
            <span className="text-gray-400">(i)</span>
          </Tooltip>
        )}
      </div>
      {expanded && node.children && (
        <ul
          id={`child-list-${node.name}`}
          className="ml-6 mt-2 border-l border-gray-700 pl-4"
        >
          {node.children.map((child, idx) => (
            <TreeNode
              key={idx}
              node={child}
              expanded={false}
              toggleExpand={toggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CareerTree;