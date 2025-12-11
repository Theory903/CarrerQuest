"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  ArrowRight, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Filter,
  Sparkles,
  Code,
  Palette,
  Shield,
  Database,
  Smartphone,
  Brain
} from 'lucide-react';

interface CareerBlog {
  id: number;
  title: string;
  content: string;
  category: string;
}

// Icon mapping for categories
const categoryIcons: { [key: string]: React.ElementType } = {
  'Technology': Code,
  'Design': Palette,
  'Security': Shield,
  'Data': Database,
  'Mobile': Smartphone,
  'AI': Brain,
};

// Color mapping for categories
const categoryColors: { [key: string]: string } = {
  'Technology': 'from-blue-500 to-cyan-500',
  'Design': 'from-pink-500 to-rose-500',
  'Security': 'from-green-500 to-emerald-500',
  'Data': 'from-purple-500 to-violet-500',
  'Mobile': 'from-orange-500 to-amber-500',
  'AI': 'from-indigo-500 to-blue-500',
};

// Fallback career data
const fallbackCareers: CareerBlog[] = [
  {
    id: 1,
    title: 'Software Engineering',
    content: 'Software Engineering involves developing and maintaining software applications. It requires strong programming skills, problem-solving abilities, and knowledge of software development methodologies. Career paths include frontend, backend, and full-stack development.',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Data Science',
    content: 'Data Science is about analyzing and interpreting complex data to help organizations make informed decisions. It involves skills in statistics, programming, machine learning, and data visualization tools.',
    category: 'Data'
  },
  {
    id: 3,
    title: 'UX/UI Design',
    content: 'UX/UI Design focuses on creating intuitive, user-friendly interfaces and experiences. It combines psychology, design thinking, and technical skills to build products that users love.',
    category: 'Design'
  },
  {
    id: 4,
    title: 'Cybersecurity',
    content: 'Cybersecurity professionals protect organizations from digital threats. This field requires knowledge of security protocols, ethical hacking, risk assessment, and incident response.',
    category: 'Security'
  },
  {
    id: 5,
    title: 'Mobile Development',
    content: 'Mobile Development involves creating applications for smartphones and tablets. Specializations include iOS (Swift), Android (Kotlin), and cross-platform development (React Native, Flutter).',
    category: 'Mobile'
  },
  {
    id: 6,
    title: 'Machine Learning Engineer',
    content: 'Machine Learning Engineers develop AI systems that can learn and improve from experience. This role combines software engineering with data science and requires strong mathematical foundations.',
    category: 'AI'
  },
];

const CareerCard: React.FC<{ career: CareerBlog; index: number }> = ({ career, index }) => {
  const Icon = categoryIcons[career.category] || Briefcase;
  const gradientColor = categoryColors[career.category] || 'from-slate-500 to-slate-600';

  return (
    <div 
      className="group card-elevated cursor-pointer opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {/* Category Badge & Icon */}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <span className="badge-primary">
          {career.category}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
        {career.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {career.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            High Demand
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            5 min read
          </span>
        </div>
        <Link
          href={`/careers/${career.id}`}
          className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="card-elevated">
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl skeleton" />
          <div className="w-20 h-6 rounded-full skeleton" />
        </div>
        <div className="w-3/4 h-6 rounded skeleton mb-3" />
        <div className="space-y-2 mb-6">
          <div className="w-full h-4 rounded skeleton" />
          <div className="w-full h-4 rounded skeleton" />
          <div className="w-2/3 h-4 rounded skeleton" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
          <div className="w-32 h-4 rounded skeleton" />
          <div className="w-24 h-4 rounded skeleton" />
        </div>
      </div>
    ))}
  </div>
);

const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<CareerBlog[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/careerBlogs`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCareers(data.length > 0 ? data : fallbackCareers);
        setFilteredCareers(data.length > 0 ? data : fallbackCareers);
      } catch (err) {
        console.error('Failed to fetch careers:', err);
        setCareers(fallbackCareers);
        setFilteredCareers(fallbackCareers);
        setError('Using offline data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, [backendUrl]);

  useEffect(() => {
    let filtered = careers;

    if (searchTerm) {
      filtered = filtered.filter(
        (career) =>
          career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          career.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((career) => career.category === selectedCategory);
    }

    setFilteredCareers(filtered);
  }, [searchTerm, selectedCategory, careers]);

  const categories = ['all', ...Array.from(new Set(careers.map((c) => c.category)))];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Explore Your Future
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Dream Career
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Explore in-depth guides to various career paths, understand the skills required, 
              and find the perfect fit for your talents and aspirations.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search career paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern pl-12 pr-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {category === 'all' ? 'All Careers' : category}
              </button>
            ))}
          </div>

          {/* Results Info */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-400 text-sm">
                Showing <span className="text-white font-medium">{filteredCareers.length}</span> career paths
              </p>
              {error && (
                <span className="text-amber-400 text-sm">{error}</span>
              )}
            </div>
          )}

          {/* Career Grid */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredCareers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCareers.map((career, index) => (
                <CareerCard key={career.id} career={career} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-slate-800/60 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No careers found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="card-elevated text-center py-16 px-8 bg-gradient-to-br from-slate-900 to-slate-800">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not sure which career suits you?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Take our AI-powered career assessment quiz to discover careers 
              aligned with your unique skills and interests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quiz" className="btn-primary">
                Take Career Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/aimentor" className="btn-secondary">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
