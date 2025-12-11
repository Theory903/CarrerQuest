"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Loader,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';

const ReportPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasQuizResults, setHasQuizResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

  // Check for quiz results on load
  useEffect(() => {
    const quizResults = localStorage.getItem('careerquest_quiz_results');
    setHasQuizResults(!!quizResults);
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Get user data
      const userData = localStorage.getItem('careerquest_user');
      const quizResults = localStorage.getItem('careerquest_quiz_results');
      
      const user = userData ? JSON.parse(userData) : null;
      const quiz = quizResults ? JSON.parse(quizResults) : null;

      const response = await fetch(`${backendUrl}/api/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentInfo: {
            name: user?.name || 'Student',
            education: 'Student',
          },
          quizResults: quiz,
          goals: [],
          interests: ['Technology', 'Design', 'Business'],
          skills: ['Problem Solving', 'Communication', 'Teamwork']
        })
      });

      if (!response.ok) throw new Error('Failed to generate report');
      
      const data = await response.json();
      setReport(data.report);
      
      // Store report
      localStorage.setItem('careerquest_report', JSON.stringify({
        reportId: data.reportId,
        content: data.report,
        generatedAt: data.generatedAt
      }));

    } catch (err) {
      console.error('Report generation error:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareerQuest_Report_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Parse report sections
  const parseSections = (content: string) => {
    const sections: { title: string; content: string }[] = [];
    const regex = /## (\d+)\. ([^\n]+)\n([\s\S]*?)(?=## \d+\.|$)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      sections.push({
        title: match[2].trim(),
        content: match[3].trim()
      });
    }

    return sections;
  };

  const sections = report ? parseSections(report) : [];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <section className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              AI-Powered Career Report
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Career
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400"> Report</span>
            </h1>
            <p className="text-lg text-slate-400">
              Get a comprehensive AI-generated career guidance report tailored to your profile, 
              personality assessment, and goals.
            </p>
          </div>

          {/* Report Status */}
          {!report ? (
            <div className="max-w-2xl mx-auto">
              <div className="card-elevated text-center">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-primary-400" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  Generate Your Personalized Report
                </h2>

                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Our AI will analyze your profile, quiz results, and interests to create 
                  a comprehensive career guidance report with actionable insights.
                </p>

                {/* What's included */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                  {[
                    { icon: Brain, text: 'Personality Analysis' },
                    { icon: Target, text: 'Career Matches' },
                    { icon: TrendingUp, text: '90-Day Action Plan' },
                    { icon: BookOpen, text: 'Learning Recommendations' },
                    { icon: Users, text: 'Mentorship Guidance' },
                    { icon: Sparkles, text: 'Long-term Roadmap' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                      <item.icon className="w-5 h-5 text-primary-400" />
                      <span className="text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Quiz Check */}
                {!hasQuizResults && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-medium">Take the quiz first for better results</p>
                      <p className="text-amber-400/70">Complete the personality quiz to get a more personalized report.</p>
                    </div>
                    <Link href="/quiz" className="ml-auto btn-secondary text-xs px-3 py-2">
                      Take Quiz
                    </Link>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="btn-primary py-4 px-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate My Report
                    </>
                  )}
                </button>

                <p className="text-slate-500 text-sm mt-4">
                  Takes about 30 seconds to generate
                </p>
              </div>
            </div>
          ) : (
            /* Report Display */
            <div className="max-w-4xl mx-auto">
              {/* Actions Bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="text-white font-medium">Report Generated</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadReport}
                    className="btn-secondary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() => { setReport(null); generateReport(); }}
                    className="btn-secondary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Report Sections */}
              <div className="space-y-4">
                {sections.length > 0 ? (
                  sections.map((section, index) => (
                    <div key={index} className="card-elevated overflow-hidden">
                      <button
                        onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                            <span className="text-primary-400 font-bold">{index + 1}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                        </div>
                        {expandedSection === index ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      
                      {expandedSection === index && (
                        <div className="px-6 pb-6 pt-0">
                          <div className="prose prose-invert max-w-none">
                            <div 
                              className="text-slate-300 leading-relaxed whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ 
                                __html: section.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                  .replace(/\n- /g, '<br/>• ')
                                  .replace(/\n\n/g, '<br/><br/>')
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  /* Raw Report Fallback */
                  <div className="card-elevated">
                    <div className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <div 
                          className="text-slate-300 leading-relaxed whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ 
                            __html: report
                              .replace(/## (\d+)\. ([^\n]+)/g, '<h2 class="text-xl font-bold text-white mt-6 mb-4">$1. $2</h2>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                              .replace(/\n- /g, '<br/>• ')
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="mt-12 text-center">
                <p className="text-slate-400 mb-6">Ready to take action on your career plan?</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/aimentor" className="btn-primary">
                    Chat with AI Mentor
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link href="/mentorships" className="btn-secondary">
                    Find a Mentor
                  </Link>
                  <Link href="/dashboard" className="btn-secondary">
                    View Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReportPage;

