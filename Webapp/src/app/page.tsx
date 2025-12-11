"use client";

import React from "react";
import Link from "next/link";
import { 
  BarChart2, 
  Compass, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Target, 
  Brain,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Play,
  TrendingUp,
  Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerInterestRadar from "@/components/Dashboard/CareerInterestRadar";
import StrengthsWeaknessesBarChart from "@/components/Dashboard/StrengthsWeaknessesBarChart";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient }) => (
  <div className="group card-elevated relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const features = [
  {
    icon: Compass,
    title: "Career Discovery",
    description: "AI-powered assessments analyze your skills, interests, and personality to reveal ideal career paths.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart2,
    title: "Visual Analytics",
    description: "Beautiful interactive charts and dashboards that make your strengths and growth areas crystal clear.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Connect with industry professionals who provide personalized guidance for your chosen field.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Brain,
    title: "AI Guidance",
    description: "24/7 AI mentor ready to answer career questions and provide instant recommendations.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set career milestones and track your progress with smart goal management tools.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Rocket,
    title: "Skill Development",
    description: "Personalized learning paths and resources to bridge skill gaps for your dream career.",
    gradient: "from-rose-500 to-pink-500"
  }
];

const stats = [
  { value: "95%", label: "Accuracy Rate" },
  { value: "500+", label: "Career Paths" },
  { value: "10K+", label: "Students Guided" },
  { value: "50+", label: "Industry Mentors" },
];

const testimonials = [
  {
    quote: "CareerQuest helped me discover my passion for data science. The AI recommendations were spot-on!",
    author: "Priya S.",
    role: "Computer Science Student"
  },
  {
    quote: "The mentor matching feature connected me with an amazing industry professional who changed my perspective.",
    author: "Rahul K.",
    role: "Engineering Graduate"
  },
  {
    quote: "Finally, a career platform that actually understands what I'm good at and what I enjoy.",
    author: "Ananya M.",
    role: "Business Student"
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary-500/20 via-primary-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-accent-500/10 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Guidance Platform
              <ChevronRight className="w-4 h-4" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in-up stagger-1">
              Navigate Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400">
                Future Career
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
              Discover your ideal career path with AI-powered insights, expert mentorship, 
              and personalized recommendations tailored just for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
              <Link href="/students" className="group btn-primary text-lg px-8 py-4">
                Start Your Quest
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/careers" className="btn-secondary text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Explore Careers
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-16 border-t border-slate-800/60 animate-fade-in-up stagger-4">
              <p className="text-slate-500 text-sm mb-6">Trusted by students from</p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
                <span className="text-lg font-semibold">IIT Delhi</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-lg font-semibold">NIT Trichy</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-lg font-semibold">BITS Pilani</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-lg font-semibold">VIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Why CareerQuest?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="block text-primary-400">Shape Your Future</span>
            </h2>
            <p className="text-lg text-slate-400">
              Comprehensive tools and insights to help you make confident career decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
              <BarChart2 className="w-4 h-4" />
              Live Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Visual
              <span className="block text-accent-400">Insights</span>
            </h2>
            <p className="text-lg text-slate-400">
              Interactive dashboards that transform complex data into actionable career insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card-elevated p-0 overflow-hidden">
              <CareerInterestRadar />
            </div>
            <div className="card-elevated p-0 overflow-hidden">
              <StrengthsWeaknessesBarChart />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-400">
              Three simple steps to discover your ideal career path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Take Assessment", desc: "Complete our AI-powered career quiz to analyze your skills and interests" },
              { step: "02", title: "Get Insights", desc: "Receive personalized career recommendations and visual analytics" },
              { step: "03", title: "Connect & Grow", desc: "Match with mentors and access resources to achieve your goals" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-slate-800/50 absolute -top-6 left-0">{item.step}</div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Students Love CareerQuest
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="card-elevated text-center py-20 px-8 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Discover Your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                  Dream Career?
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-10">
                Join thousands of students who are already navigating their future with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/students" className="group btn-primary text-lg px-10 py-5">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/aimentor" className="btn-secondary text-lg px-10 py-5">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Mentor
                </Link>
              </div>
              <p className="mt-8 text-slate-500 text-sm">
                <CheckCircle2 className="w-4 h-4 inline mr-1" />
                No credit card required • Free forever for students
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
