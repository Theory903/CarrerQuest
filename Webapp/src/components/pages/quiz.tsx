"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Loader,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  Briefcase,
  RefreshCw,
  Download,
  Share2,
  ChevronDown
} from 'lucide-react';

interface QuizOption {
  text: string;
  value?: string;
}

interface QuizQuestion {
  id: number;
  category: string;
  text: string;
  options: QuizOption[];
}

interface QuizResult {
  scores: Record<string, number>;
  careerValues: string[];
  workStyle: string[];
  analysis: string;
  resultId: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  openness: Lightbulb,
  conscientiousness: Target,
  extraversion: Users,
  agreeableness: Users,
  emotional_stability: Brain,
  realistic: Briefcase,
  investigative: BookOpen,
  artistic: Sparkles,
  social: Users,
  enterprising: TrendingUp,
  conventional: Target,
  technical: Brain,
  leadership: Award,
  career_values: Target,
  work_style: Briefcase
};

const categoryLabels: Record<string, string> = {
  openness: 'Openness & Curiosity',
  conscientiousness: 'Organization & Planning',
  extraversion: 'Social Energy',
  agreeableness: 'Teamwork & Cooperation',
  emotional_stability: 'Emotional Resilience',
  realistic: 'Hands-on Work',
  investigative: 'Analytical Thinking',
  artistic: 'Creative Expression',
  social: 'Helping Others',
  enterprising: 'Leadership',
  conventional: 'Structure & Detail',
  technical: 'Technical Skills',
  leadership: 'Leadership Potential',
  career_values: 'Career Values',
  work_style: 'Work Preferences'
};

// Parse markdown sections from analysis
const parseAnalysisSections = (analysis: string) => {
  const sections: { title: string; content: string; icon: React.ElementType }[] = [];
  
  // Split by ### headers
  const parts = analysis.split(/###\s+/);
  
  const sectionIcons: Record<string, React.ElementType> = {
    'PERSONALITY SUMMARY': Brain,
    'TOP 5 CAREER MATCHES': Target,
    'PERSONALITY STRENGTHS': Award,
    'AREAS FOR DEVELOPMENT': TrendingUp,
    'RECOMMENDED CAREER PATHS': Briefcase,
    'ACTIONABLE NEXT STEPS': CheckCircle2,
    'LEARNING RECOMMENDATIONS': BookOpen,
  };

  parts.forEach(part => {
    if (part.trim()) {
      const lines = part.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      
      if (title && content) {
        sections.push({
          title,
          content,
          icon: sectionIcons[title] || Sparkles
        });
      }
    }
  });

  return sections;
};

// Format markdown content to HTML
const formatMarkdownContent = (content: string) => {
  return content
    // Bold text
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Headers (#### level)
    .replace(/####\s+([^\n]+)/g, '<h4 class="text-lg font-semibold text-white mt-4 mb-2">$1</h4>')
    // Bullet points with ** inside
    .replace(/^\*\s+\*\*([^*]+)\*\*:\s*/gm, '<div class="flex items-start gap-3 mb-3"><span class="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0"></span><div><span class="text-white font-medium">$1:</span> ')
    .replace(/^\*\s+\*\*(\d+)\.\s+([^*]+)\*\*:\s*/gm, '<div class="flex items-start gap-3 mb-3"><span class="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 text-sm flex items-center justify-center flex-shrink-0">$1</span><div><span class="text-white font-medium">$2:</span> ')
    // Regular bullet points
    .replace(/^\*\s+([^\n]+)/gm, '<div class="flex items-start gap-3 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></span><span>$1</span></div>')
    // Numbered lists
    .replace(/^(\d+)\.\s+\*\*([^*]+)\*\*:\s*/gm, '<div class="flex items-start gap-3 mb-3"><span class="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 text-sm flex items-center justify-center flex-shrink-0">$1</span><div><span class="text-white font-medium">$2:</span> ')
    .replace(/^(\d+)\.\s+([^\n]+)/gm, '<div class="flex items-start gap-3 mb-2"><span class="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-sm flex items-center justify-center flex-shrink-0">$1</span><span>$2</span></div>')
    // Line breaks
    .replace(/\n\n/g, '</div><div class="mb-4">')
    .replace(/\n/g, '<br/>');
};

const PersonalityQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1, 2]));
  
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/quiz/questions`);
        if (!response.ok) throw new Error('Failed to load quiz');
        
        const data = await response.json();
        setQuestions(data.questions);
        setSessionId(data.sessionId);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please refresh the page.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [backendUrl]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedAnswer });
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] ?? null);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    
    const finalAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer };
    setAnswers(finalAnswers);
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          answers: finalAnswers,
          userInfo: {
            education: 'Student',
            experience: 'Entry level'
          }
        })
      });

      if (!response.ok) throw new Error('Failed to submit quiz');
      
      const result = await response.json();
      setQuizResult(result);
      
      // Store results for report generation
      localStorage.setItem('careerquest_quiz_results', JSON.stringify(result));

    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to analyze results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setQuizResult(null);
    setIsLoading(true);
    setExpandedSections(new Set([0, 1, 2]));
    
    // Fetch new questions
    fetch(`${backendUrl}/api/quiz/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setSessionId(data.sessionId);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to reload quiz');
        setIsLoading(false);
      });
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const downloadReport = () => {
    if (!quizResult) return;
    const content = `CareerQuest Career Assessment Report\n${'='.repeat(40)}\n\nPersonality Scores:\n${Object.entries(quizResult.scores).map(([k, v]) => `- ${categoryLabels[k] || k}: ${v}%`).join('\n')}\n\n${quizResult.analysis}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareerQuest_Assessment_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const progress = questions.length > 0 ? ((Object.keys(answers).length) / questions.length) * 100 : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-primary-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Preparing Your Assessment</h2>
            <p className="text-slate-400">Loading personalized quiz questions...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && !quizResult) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="card-elevated text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
            <button onClick={resetQuiz} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Result state
  if (quizResult) {
    const analysisSections = parseAnalysisSections(quizResult.analysis);
    
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-6">
            {/* Success Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Assessment Complete!
              </h1>
              <p className="text-slate-400">
                Your AI-powered career analysis is ready. Here&apos;s what we discovered about you.
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button onClick={downloadReport} className="btn-secondary text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'My CareerQuest Results', text: 'Check out my career assessment results!' });
                    }
                  }} 
                  className="btn-secondary text-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Scores Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
              {Object.entries(quizResult.scores)
                .filter(([key]) => key !== 'career_values' && key !== 'work_style')
                .sort((a, b) => b[1] - a[1])
                .slice(0, 9)
                .map(([category, score]) => {
                  const Icon = categoryIcons[category] || Brain;
                  const label = categoryLabels[category] || category;
                  const scoreNum = typeof score === 'number' ? score : 0;
                  return (
                    <div key={category} className="card-elevated">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          scoreNum >= 80 ? 'bg-emerald-500/20' : 
                          scoreNum >= 60 ? 'bg-primary-500/20' : 
                          scoreNum >= 40 ? 'bg-amber-500/20' : 'bg-slate-700/50'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            scoreNum >= 80 ? 'text-emerald-400' : 
                            scoreNum >= 60 ? 'text-primary-400' : 
                            scoreNum >= 40 ? 'text-amber-400' : 'text-slate-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate text-sm">{label}</p>
                        </div>
                        <span className={`text-2xl font-bold ${
                          scoreNum >= 80 ? 'text-emerald-400' : 
                          scoreNum >= 60 ? 'text-primary-400' : 
                          scoreNum >= 40 ? 'text-amber-400' : 'text-slate-400'
                        }`}>{scoreNum}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            scoreNum >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 
                            scoreNum >= 60 ? 'bg-gradient-to-r from-primary-500 to-primary-400' : 
                            scoreNum >= 40 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-slate-600'
                          }`}
                          style={{ width: `${scoreNum}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* AI Analysis Sections */}
            <div className="max-w-4xl mx-auto mb-12 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Career Analysis</h2>
                  <p className="text-slate-400 text-sm">Powered by Llama 4 AI</p>
                </div>
              </div>

              {analysisSections.length > 0 ? (
                analysisSections.map((section, index) => {
                  const SectionIcon = section.icon;
                  const isExpanded = expandedSections.has(index);
                  
                  return (
                    <div key={index} className="card-elevated overflow-hidden">
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                            <SectionIcon className="w-5 h-5 text-primary-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-14">
                            <div 
                              className="text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
                              dangerouslySetInnerHTML={{ __html: formatMarkdownContent(section.content) }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                /* Fallback for unparsed content */
                <div className="card-elevated">
                  <div className="p-6">
                    <div 
                      className="text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: formatMarkdownContent(quizResult.analysis) }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => router.push('/dashboard')} 
                className="btn-primary"
              >
                View Your Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={() => router.push('/report')} 
                className="btn-secondary"
              >
                Generate Full Report
              </button>
              <button 
                onClick={resetQuiz}
                className="btn-secondary"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retake Quiz
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Quiz state
  const currentQ = questions[currentQuestion];
  const Icon = categoryIcons[currentQ?.category] || Brain;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <section className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
                <Brain className="w-4 h-4" />
                AI-Powered Career Assessment
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Discover Your Ideal Career
              </h1>
              <p className="text-slate-400">
                Answer honestly - there are no right or wrong answers
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="card-elevated mb-8">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-sm text-slate-400">
                  {categoryLabels[currentQ?.category] || currentQ?.category}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
                {currentQ?.text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'bg-primary-500/20 border-primary-500/50 text-white'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-slate-600'
                      }`}>
                        {selectedAnswer === index && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null || isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get My Results
                      <Sparkles className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PersonalityQuiz;
