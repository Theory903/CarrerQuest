// pages/career.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Sample data (replace this with your data source)
const careerBlogs = [
  {
    id: '1',
    title: 'Software Engineering',
    content: 'Software Engineering involves developing and maintaining software applications. It requires strong programming skills and knowledge of software development methodologies.',
  },
  {
    id: '2',
    title: 'Data Science',
    content: 'Data Science is about analyzing and interpreting complex data to help organizations make informed decisions. It involves skills in statistics, programming, and data visualization.',
  },
  // Add more careers as needed
];

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Career Fields | CareerQuest</title>
        <meta name="description" content="Explore detailed blog posts on various career fields." />
      </Head>

      {/* Global Navigation */}
      <Navbar />

      {/* Page Header */}
      <header className="py-12 bg-gray-800">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-100">Explore Career Fields</h1>
          <p className="mt-2 text-lg text-gray-300">Discover various career paths and learn about their requirements and opportunities.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {careerBlogs.map((blog) => (
            <div key={blog.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">{blog.title}</h2>
              <p className="text-gray-300 mb-4">{blog.content}</p>
              <Link href={`/career/${blog.id}`} className="text-blue-400 hover:text-blue-300">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Career;
