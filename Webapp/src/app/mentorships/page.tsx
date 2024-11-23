"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorCard from "@/components/MentorCard";
import axios from "axios";

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  bio: string;
  availability: string;
}

const MentorshipPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentorshipRequest, setMentorshipRequest] = useState({
    name: "",
    email: "",
    preferredMentor: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [filterExpertise, setFilterExpertise] = useState("");
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/mentors`);
        setMentors(response.data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    fetchMentors();
  }, [backendUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMentorshipRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/mentorshipRequests`, mentorshipRequest);
      setSubmitted(true);
      setMentorshipRequest({
        name: "",
        email: "",
        preferredMentor: "",
        message: "",
      });
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error) {
      console.error("Failed to submit mentorship request:", error);
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    filterExpertise === "" || mentor.expertise.toLowerCase().includes(filterExpertise.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-center">Mentorship Program</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6">Request a Mentor</h2>
          {submitted ? (
            <div className="mb-6 bg-green-600 text-white p-4 rounded-md">
              Your mentorship request has been submitted successfully! Redirecting to dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={mentorshipRequest.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={mentorshipRequest.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Mentor (Optional)</label>
                <select
                  name="preferredMentor"
                  value={mentorshipRequest.preferredMentor}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={mentorshipRequest.message}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Meet Our Mentors</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Filter by Expertise</label>
            <input
              type="text"
              value={filterExpertise}
              onChange={(e) => setFilterExpertise(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expertise (e.g., Machine Learning, Web Development)"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          {filteredMentors.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No mentors found matching the filter criteria.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorshipPage;