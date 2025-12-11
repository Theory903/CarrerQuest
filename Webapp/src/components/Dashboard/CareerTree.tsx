"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, RefreshCw, AlertCircle, Briefcase, Code, Palette, TrendingUp } from "lucide-react";

interface CareerNode {
  name: string;
  description?: string;
  children?: CareerNode[];
  color?: string;
}

// Fallback career tree data
const fallbackCareerTree: CareerNode[] = [
  {
    name: "Technology",
    description: "Explore cutting-edge technology fields.",
    children: [
      { name: "Software Development", color: "#0ea5e9", description: "Create and maintain software applications." },
      { name: "Data Science", color: "#10b981", description: "Analyze and interpret complex data." },
      { name: "Cybersecurity", color: "#f59e0b", description: "Protect systems and data from cyber threats." },
      { name: "Cloud Computing", color: "#8b5cf6", description: "Build and manage cloud infrastructure." },
    ]
  },
  {
    name: "Creative & Design",
    description: "Express creativity and explore artistic fields.",
    children: [
      { name: "UX/UI Design", color: "#ec4899", description: "Design user experiences and interfaces." },
      { name: "Graphic Design", color: "#f97316", description: "Create visual content for various media." },
      { name: "Motion Graphics", color: "#06b6d4", description: "Create animated visual content." },
    ]
  },
  {
    name: "Business & Management",
    description: "Lead teams and drive business growth.",
    children: [
      { name: "Product Management", color: "#84cc16", description: "Define product vision and strategy." },
      { name: "Marketing", color: "#d946ef", description: "Promote products and services." },
      { name: "Finance", color: "#14b8a6", description: "Manage financial resources and planning." },
    ]
  },
  {
    name: "Healthcare & Science",
    description: "Contribute to health and scientific advancement.",
    children: [
      { name: "Biomedical Engineering", color: "#ef4444", description: "Apply engineering to healthcare." },
      { name: "Research Science", color: "#6366f1", description: "Conduct scientific research." },
    ]
  },
];

const getCategoryIcon = (name: string) => {
  if (name.includes('Technology')) return Code;
  if (name.includes('Creative') || name.includes('Design')) return Palette;
  if (name.includes('Business')) return TrendingUp;
  return Briefcase;
};

const LoadingSkeleton: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between mb-6">
      <div className="w-56 h-7 rounded skeleton" />
      <div className="w-8 h-8 rounded-lg skeleton" />
    </div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="p-4 rounded-xl bg-slate-800/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg skeleton" />
          <div className="w-40 h-5 rounded skeleton" />
        </div>
        <div className="ml-13 space-y-2">
          <div className="w-32 h-4 rounded skeleton" />
          <div className="w-28 h-4 rounded skeleton" />
        </div>
      </div>
    ))}
  </div>
);

interface TreeNodeProps {
  node: CareerNode;
  level: number;
  expanded: { [key: string]: boolean };
  toggleExpand: (name: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, expanded, toggleExpand }) => {
  const isExpanded = expanded[node.name] || false;
  const hasChildren = node.children && node.children.length > 0;
  const Icon = level === 0 ? getCategoryIcon(node.name) : null;

  return (
    <div className={`${level > 0 ? 'ml-6 border-l border-slate-800 pl-4' : ''}`}>
      <div
        className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
          level === 0 
            ? 'bg-slate-800/50 hover:bg-slate-800/80 mb-2' 
            : 'hover:bg-slate-800/30'
        }`}
        onClick={() => hasChildren && toggleExpand(node.name)}
      >
        {/* Expand Icon */}
        {hasChildren ? (
          <button className="w-6 h-6 rounded-md bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div 
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ backgroundColor: node.color ? `${node.color}20` : 'transparent' }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: node.color || '#64748b' }}
            />
          </div>
        )}

        {/* Category Icon */}
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-400" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className={`font-medium ${level === 0 ? 'text-white text-lg' : 'text-slate-200'}`}>
            {node.name}
          </span>
          {node.description && (
            <p className="text-slate-500 text-sm truncate">{node.description}</p>
          )}
        </div>

        {/* Child count */}
        {hasChildren && (
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
            {node.children!.length}
          </span>
        )}
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="mt-1 space-y-1">
          {node.children!.map((child, idx) => (
            <TreeNode
              key={idx}
              node={child}
              level={level + 1}
              expanded={expanded}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CareerTree: React.FC = () => {
  const [careerTree, setCareerTree] = useState<CareerNode[]>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const fetchCareerTree = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/careerTree`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCareerTree(data.length > 0 ? data : fallbackCareerTree);
      setIsOffline(false);
    } catch (err) {
      console.error("Failed to fetch career tree:", err);
      setCareerTree(fallbackCareerTree);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerTree();
    // Expand first category by default
    setExpanded({ 'Technology': true });
  }, []);

  const toggleExpand = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const expandAll = () => {
    const allExpanded: { [key: string]: boolean } = {};
    careerTree.forEach(node => {
      allExpanded[node.name] = true;
    });
    setExpanded(allExpanded);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Career Path Explorer</h3>
          <p className="text-slate-400 text-sm">Discover career paths that match your interests</p>
        </div>
        <div className="flex items-center gap-2">
          {isOffline && (
            <span className="badge-accent text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Offline
            </span>
          )}
          <button
            onClick={fetchCareerTree}
            className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={expandAll}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          Collapse All
        </button>
      </div>

      {/* Tree */}
      <div className="space-y-3">
        {careerTree.map((node, index) => (
          <TreeNode
            key={index}
            node={node}
            level={0}
            expanded={expanded}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>

      {/* Hint */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <p className="text-slate-500 text-xs text-center">
          Click on a category to explore career options within that field
        </p>
      </div>
    </div>
  );
};

export default CareerTree;
