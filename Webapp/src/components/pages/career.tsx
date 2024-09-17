// pages/career.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

const CareerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Career Fields | CareerQuest</title>
        <meta name="description" content="Explore detailed blog posts on various career fields." />
      </Head>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Explore Career Fields</h1>
      </header>

      <main>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerBlogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <Link href={`/career/${blog.id}`}>
                <a className="text-blue-500 hover:underline">Read more</a>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CareerPage;
