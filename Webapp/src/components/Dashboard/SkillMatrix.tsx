"use client";

import React, { useState } from 'react';
import { Filter, TrendingUp, Award, AlertCircle, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: 'Developing' | 'Proficient' | 'Expert';
  category: string;
  progress: number;
}

const skills: Skill[] = [
  { name: 'Critical Thinking', level: 'Expert', category: 'Soft Skills', progress: 90 },
  { name: 'Communication', level: 'Proficient', category: 'Soft Skills', progress: 75 },
  { name: 'Problem Solving', level: 'Developing', category: 'Soft Skills', progress: 45 },
  { name: 'Creativity', level: 'Proficient', category: 'Soft Skills', progress: 70 },
  { name: 'Time Management', level: 'Expert', category: 'Soft Skills', progress: 85 },
  { name: 'JavaScript', level: 'Expert', category: 'Technical', progress: 92 },
  { name: 'Python', level: 'Proficient', category: 'Technical', progress: 78 },
  { name: 'Data Analysis', level: 'Developing', category: 'Technical', progress: 55 },
  { name: 'UI/UX Design', level: 'Proficient', category: 'Technical', progress: 68 },
  { name: 'Project Management', level: 'Developing', category: 'Professional', progress: 40 },
];

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'Developing':
      return { 
        color: 'text-amber-400', 
        bg: 'bg-amber-500/20', 
        border: 'border-amber-500/30',
        gradient: 'from-amber-500 to-amber-400'
      };
    case 'Proficient':
      return { 
        color: 'text-primary-400', 
        bg: 'bg-primary-500/20', 
        border: 'border-primary-500/30',
        gradient: 'from-primary-500 to-primary-400'
      };
    case 'Expert':
      return { 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-500/20', 
        border: 'border-emerald-500/30',
        gradient: 'from-emerald-500 to-emerald-400'
      };
    default:
      return { 
        color: 'text-slate-400', 
        bg: 'bg-slate-500/20', 
        border: 'border-slate-500/30',
        gradient: 'from-slate-500 to-slate-400'
      };
  }
};

type FilterType = 'All' | 'Developing' | 'Proficient' | 'Expert';

const SkillMatrix: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];
  
  const filteredSkills = skills.filter(skill => {
    const levelMatch = filter === 'All' || skill.level === filter;
    const categoryMatch = categoryFilter === 'All' || skill.category === categoryFilter;
    return levelMatch && categoryMatch;
  });

  const stats = {
    expert: skills.filter(s => s.level === 'Expert').length,
    proficient: skills.filter(s => s.level === 'Proficient').length,
    developing: skills.filter(s => s.level === 'Developing').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">Skill Assessment</h3>
        <p className="text-slate-400 text-sm">Your current skill levels and progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm">Expert</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.expert}</p>
        </div>
        <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm">Proficient</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.proficient}</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm">Developing</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.developing}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400 text-sm">Level:</span>
          <div className="flex gap-2">
            {(['All', 'Expert', 'Proficient', 'Developing'] as FilterType[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === level
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-modern py-1.5 px-3 text-sm w-auto"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-3">
        {filteredSkills.map((skill, index) => {
          const config = getLevelConfig(skill.level);
          return (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-slate-800/30 border border-slate-800/60 hover:border-slate-700/60 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-slate-500 text-xs">{skill.category}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
                  {skill.level}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <span className={`text-sm font-semibold ${config.color}`}>{skill.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No skills match your filter criteria</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-800/60">
        <p className="text-slate-500 text-xs text-center">
          Skills are assessed based on your quiz responses and activity on the platform
        </p>
      </div>
    </div>
  );
};

export default SkillMatrix;
