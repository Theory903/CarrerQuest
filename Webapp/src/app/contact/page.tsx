"use client";

import React, { useState, FormEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
  Clock
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@careerquest.com",
    description: "We'll respond within 24 hours"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "India",
    description: "Smart India Hackathon 2024"
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "24/7 AI Support",
    description: "Human support: 9AM - 6PM IST"
  }
];

const faqs = [
  {
    question: "How does CareerQuest work?",
    answer: "CareerQuest uses AI-powered assessments to analyze your skills, interests, and personality traits, then matches you with suitable career paths and provides personalized guidance."
  },
  {
    question: "Is CareerQuest free to use?",
    answer: "Yes! CareerQuest is completely free for students. We believe quality career guidance should be accessible to everyone."
  },
  {
    question: "How accurate are the career recommendations?",
    answer: "Our AI model is trained on extensive career data and continuously improves. Combined with expert mentor reviews, we achieve a 95% satisfaction rate."
  },
  {
    question: "Can I connect with real mentors?",
    answer: "Absolutely! We have 50+ industry mentors across various fields who provide personalized guidance and real-world insights."
  }
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We&apos;d Love to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Hear From You
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Have questions, feedback, or need support? Our team is here to help 
              you navigate your career journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="card-elevated text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                <p className="text-primary-400 font-medium mb-1">{info.value}</p>
                <p className="text-slate-500 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="card-elevated text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-modern"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-modern"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-modern"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-modern min-h-[150px] resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="card-elevated">
                    <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-slate-800/60">
                <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Github, href: 'https://github.com', label: 'GitHub' },
                    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 hover:border-slate-600/60 transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

