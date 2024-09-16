"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MentorCard from '../../components/MentorCard'; // Assuming you have a MentorCard component

// Sample mentor data (you might fetch this from an API or a database)
const sampleMentors = [
  { id: 1, name: 'John Doe', expertise: 'Machine Learning', bio: 'Experienced ML engineer with a background in NLP.' },
  { id: 2, name: 'Jane Smith', expertise: 'Web Development', bio: 'Full-stack developer with a focus on modern JavaScript frameworks.' },
  // Add more sample mentors here
];

const MentorshipPage: React.FC = () => {
  const [mentorshipRequest, setMentorshipRequest] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMentorshipRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Process the mentorship request (e.g., send it to the backend)
    console.log('Mentorship Request:', mentorshipRequest);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Mentorship Program</h1>

        {/* Mentorship Request Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6">Request a Mentor</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={mentorshipRequest.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={mentorshipRequest.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={mentorshipRequest.message}
                onChange={handleChange}
                className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
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
        </div>

        {/* Mentors List */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Meet Our Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorshipPage;