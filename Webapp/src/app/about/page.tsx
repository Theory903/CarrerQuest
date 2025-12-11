"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Target, 
  Lightbulb, 
  Heart,
  Rocket,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "Every feature we build aims to help students discover their true calling and achieve their career goals."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage cutting-edge AI and machine learning to provide personalized, actionable career insights."
  },
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Our platform is designed with students in mind, making career exploration accessible and engaging."
  },
  {
    icon: Shield,
    title: "Trust & Privacy",
    description: "We protect your data with industry-leading security practices and never share your information."
  }
];

const stats = [
  { value: "10K+", label: "Students Guided" },
  { value: "500+", label: "Career Paths" },
  { value: "50+", label: "Industry Mentors" },
  { value: "95%", label: "Satisfaction Rate" },
];

const teamMembers = [
  { name: "Smart India Hackathon", role: "2024 Project", avatar: "🏆" },
  { name: "FeedMind Team", role: "Development", avatar: "💡" },
  { name: "AI/ML Division", role: "Intelligence", avatar: "🤖" },
  { name: "UX Research", role: "Design", avatar: "🎨" },
];

const AboutPage: React.FC = () => {
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
              About CareerQuest
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Empowering the Next{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Generation
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              CareerQuest is an AI-powered career guidance platform helping students 
              navigate their professional future with confidence and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800/60 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Democratizing Career Guidance Through Technology
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We believe every student deserves access to quality career guidance. 
                Traditional counseling is often inaccessible or limited. CareerQuest bridges 
                this gap by combining artificial intelligence with human expertise.
              </p>
              <ul className="space-y-4">
                {[
                  "Personalized career recommendations based on skills & interests",
                  "AI-powered assessments that understand your unique profile",
                  "Direct connection with industry mentors",
                  "Comprehensive career path visualizations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="card-elevated p-8 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500/30 to-transparent rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent-500/30 to-transparent rounded-full blur-2xl" />
                <div className="relative text-center py-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Smart India Hackathon 2024</h3>
                  <p className="text-slate-400 mb-6">
                    CareerQuest was developed as part of the Smart India Hackathon 2024 
                    by the FeedMind team to address the career guidance gap in education.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['AI/ML', 'Next.js', 'React', 'Node.js'].map(tech => (
                      <span key={tech} className="badge-primary">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do at CareerQuest
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card-elevated text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Team Behind CareerQuest</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A passionate group working to revolutionize career guidance
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="card-elevated text-center">
                <div className="text-5xl mb-4">{member.avatar}</div>
                <h4 className="text-white font-semibold mb-1">{member.name}</h4>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="card-elevated text-center py-16 px-8 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of students who are discovering their ideal career paths 
                with CareerQuest.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/students" className="btn-primary">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/careers" className="btn-secondary">
                  Explore Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

