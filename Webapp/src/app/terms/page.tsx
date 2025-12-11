"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
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
              <FileText className="w-4 h-4" />
              Terms of Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Terms of{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Service
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
              Please read these terms carefully before using CareerQuest.
            </p>
            <p className="text-slate-500 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Acceptance */}
            <div className="card-elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    By accessing or using CareerQuest, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our platform.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    CareerQuest reserves the right to modify these terms at any time. We will notify users 
                    of significant changes via email or through the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Use of Service */}
            <div className="card-elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">2. Use of Service</h2>
                  <p className="text-slate-400 leading-relaxed mb-4">You agree to:</p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      Provide accurate and truthful information in assessments and profiles
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      Use the platform for legitimate career exploration purposes only
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      Respect the intellectual property rights of CareerQuest and its users
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      Not attempt to manipulate or exploit our AI systems
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      Maintain the confidentiality of your account credentials
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card-elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">3. Disclaimer</h2>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    CareerQuest provides career guidance tools and recommendations based on AI analysis. 
                    While we strive for accuracy, our recommendations should be considered as guidance 
                    rather than definitive career advice.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    We encourage users to consider multiple sources of information and consult with 
                    professional career counselors when making important career decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="space-y-6">
              <div className="card-elevated">
                <h3 className="text-lg font-bold text-white mb-3">4. Intellectual Property</h3>
                <p className="text-slate-400 leading-relaxed">
                  All content, features, and functionality of CareerQuest are owned by us and are 
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div className="card-elevated">
                <h3 className="text-lg font-bold text-white mb-3">5. User Content</h3>
                <p className="text-slate-400 leading-relaxed">
                  By submitting content to CareerQuest, you grant us a non-exclusive license to use 
                  that content for improving our services. You retain ownership of your personal data.
                </p>
              </div>

              <div className="card-elevated">
                <h3 className="text-lg font-bold text-white mb-3">6. Limitation of Liability</h3>
                <p className="text-slate-400 leading-relaxed">
                  CareerQuest shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of the service.
                </p>
              </div>

              <div className="card-elevated">
                <h3 className="text-lg font-bold text-white mb-3">7. Contact</h3>
                <p className="text-slate-400 leading-relaxed">
                  For questions about these terms, please contact us through our{' '}
                  <a href="/contact" className="text-primary-400 hover:underline">contact page</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;

