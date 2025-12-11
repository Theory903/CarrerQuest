"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorCard from "@/components/MentorCard";
import { 
  Search, 
  Users, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  ArrowRight,
  UserPlus,
  MessageSquare
} from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  bio: string;
  availability: string;
}

// Fallback mentors data
const fallbackMentors: Mentor[] = [
  { id: 1, name: "John Doe", expertise: "Machine Learning", bio: "Experienced ML engineer with a background in NLP and deep learning. 8+ years of industry experience at top tech companies.", availability: "Mon, Wed, Fri" },
  { id: 2, name: "Jane Smith", expertise: "Web Development", bio: "Full-stack developer with a focus on modern JavaScript frameworks. Passionate about teaching and helping others grow.", availability: "Tue, Thu" },
  { id: 3, name: "Alice Johnson", expertise: "Data Science", bio: "Data scientist specializing in predictive analytics and visualization. Love turning complex data into actionable insights.", availability: "Mon, Thu, Sat" },
  { id: 4, name: "Bob Williams", expertise: "Cybersecurity", bio: "Cybersecurity expert with experience in threat detection and prevention. Certified ethical hacker and security consultant.", availability: "Wed, Fri" },
  { id: 5, name: "Eva Brown", expertise: "UX/UI Design", bio: "UX/UI designer passionate about creating intuitive user experiences. Design thinking advocate with 6+ years experience.", availability: "Tue, Sat" },
  { id: 6, name: "Mike Davis", expertise: "Mobile Development", bio: "Mobile app developer skilled in both iOS and Android platforms. Created apps with millions of downloads.", availability: "Mon, Wed, Fri" }
];

const expertiseOptions = [
  'All Expertise',
  'Machine Learning',
  'Web Development',
  'Data Science',
  'Cybersecurity',
  'UX/UI Design',
  'Mobile Development',
];

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="card-elevated">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl skeleton" />
          <div className="flex-1">
            <div className="w-3/4 h-5 rounded skeleton mb-2" />
            <div className="w-1/2 h-4 rounded skeleton" />
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="w-full h-4 rounded skeleton" />
          <div className="w-full h-4 rounded skeleton" />
          <div className="w-2/3 h-4 rounded skeleton" />
        </div>
        <div className="w-full h-12 rounded-xl skeleton" />
      </div>
    ))}
  </div>
);

const MentorshipPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterExpertise, setFilterExpertise] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [mentorshipRequest, setMentorshipRequest] = useState({
    name: "",
    email: "",
    preferredMentor: "",
    message: "",
  });

  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/mentors`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMentors(data.length > 0 ? data : fallbackMentors);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
        setMentors(fallbackMentors);
        setError('Using offline data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, [backendUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMentorshipRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${backendUrl}/api/mentorshipRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mentorshipRequest),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
      setMentorshipRequest({ name: "", email: "", preferredMentor: "", message: "" });
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err) {
      console.error("Failed to submit:", err);
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !filterExpertise || filterExpertise === 'All Expertise' || 
                            mentor.expertise.toLowerCase().includes(filterExpertise.toLowerCase());
    return matchesSearch && matchesExpertise;
  });

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
              <Users className="w-4 h-4" />
              Connect with Industry Experts
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Perfect Mentor
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Connect with experienced professionals who can guide you through your career journey 
              with personalized advice and real-world insights.
            </p>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="card-elevated max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Request a Mentor</h2>
                <p className="text-slate-400 text-sm">Fill out the form to get matched with a mentor</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                <p className="text-slate-400 mb-4">
                  Your mentorship request has been received. Redirecting to dashboard...
                </p>
                <div className="w-48 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-[shimmer_3s_linear]" style={{ width: '100%' }} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={mentorshipRequest.name}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={mentorshipRequest.email}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Preferred Mentor (Optional)
                  </label>
                  <select
                    name="preferredMentor"
                    value={mentorshipRequest.preferredMentor}
                    onChange={handleChange}
                    className="input-modern"
                  >
                    <option value="">Select a mentor (optional)</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.name}>
                        {mentor.name} - {mentor.expertise}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={mentorshipRequest.message}
                    onChange={handleChange}
                    className="input-modern min-h-[120px] resize-none"
                    placeholder="Tell us about your career goals and what you'd like help with..."
                    required
                  />
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{submitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Submit Request
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Meet Our Mentors</h2>
              <p className="text-slate-400">Industry experts ready to guide your journey</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-11 w-full sm:w-64"
                  placeholder="Search mentors..."
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  value={filterExpertise}
                  onChange={(e) => setFilterExpertise(e.target.value)}
                  className="input-modern pl-11 pr-10 w-full sm:w-48 appearance-none cursor-pointer"
                >
                  {expertiseOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-400 text-sm">
                Showing <span className="text-white font-medium">{filteredMentors.length}</span> mentors
              </p>
              {error && (
                <span className="text-amber-400 text-sm">{error}</span>
              )}
            </div>
          )}

          {/* Mentors Grid */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <div
                  key={mentor.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-slate-800/60 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No mentors found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Mentor CTA */}
      <section className="py-16 border-t border-slate-800/60">
        <div className="container mx-auto px-6">
          <div className="card-elevated text-center py-16 px-8 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                24/7 Available
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Instant Guidance?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Our AI Mentor is available around the clock to answer your career questions 
                and provide personalized recommendations.
              </p>
              <a href="/aimentor" className="btn-primary inline-flex">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Mentor
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorshipPage;
