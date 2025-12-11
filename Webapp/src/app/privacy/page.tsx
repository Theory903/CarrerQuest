"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, UserCheck, Bell } from 'lucide-react';

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal information you provide (name, email, educational background)",
      "Career assessment responses and quiz results",
      "Usage data and interaction patterns with our platform",
      "Device and browser information for optimization"
    ]
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "Provide personalized career recommendations and insights",
      "Match you with suitable mentors based on your profile",
      "Improve our AI algorithms and user experience",
      "Send relevant updates and career opportunities (with consent)"
    ]
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "Industry-standard encryption for data transmission and storage",
      "Regular security audits and vulnerability assessments",
      "Strict access controls for team members",
      "Secure cloud infrastructure with redundant backups"
    ]
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access and download your personal data anytime",
      "Request correction of inaccurate information",
      "Delete your account and associated data",
      "Opt-out of marketing communications"
    ]
  },
  {
    icon: Shield,
    title: "Data Sharing",
    content: [
      "We never sell your personal information to third parties",
      "Mentor connections are made with your explicit consent",
      "Analytics data is anonymized and aggregated",
      "Legal compliance may require limited disclosure"
    ]
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: [
      "Essential cookies for platform functionality",
      "Analytics cookies to improve user experience",
      "You can manage cookie preferences in your browser",
      "We respect Do Not Track browser settings"
    ]
  }
];

const PrivacyPage: React.FC = () => {
  const lastUpdated = "December 2024";

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Privacy{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Matters
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
              At CareerQuest, we're committed to protecting your personal information 
              and being transparent about how we use it.
            </p>
            <p className="text-slate-500 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 border-y border-slate-800/60 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Quick Summary</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-emerald-300">Data encrypted in transit & at rest</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <UserCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-emerald-300">Never sell your personal data</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-emerald-300">Full control over your data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="card-elevated">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                          <span className="text-slate-400 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-slate-400 mb-6">
              If you have any questions or concerns about our privacy practices, 
              please don't hesitate to reach out.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              Contact Our Privacy Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;

