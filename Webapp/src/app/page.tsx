"use client";
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart2, Compass, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareerInterestRadar from '@/components/Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '@/components/Dashboard/StrengthsWeaknessesBarChart';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-gray-800 border-gray-700">
    <CardHeader>
      <Icon className="w-10 h-10 mb-2 text-blue-500" aria-hidden="true" />
      <CardTitle className="text-white text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-gray-200">{description}</CardDescription>
    </CardContent>
  </Card>
);

const initialInterestData = [
  { category: 'STEM', score: 85, fullMark: 100 },
  { category: 'Arts', score: 60, fullMark: 100 },
  { category: 'Business', score: 75, fullMark: 100 },
  { category: 'Social Sciences', score: 70, fullMark: 100 },
  { category: 'Healthcare', score: 65, fullMark: 100 },
];

const Home = () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataChange = (newData:any) => {
    console.log('Interest data updated:', newData);
    // You can update your app's state or perform other actions here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>CareerQuest | Navigate Your Future</title>
        <meta name="description" content="CareerQuest: Your ultimate career navigation tool for personalized recommendations, analytics, and mentorship matching." />
        <meta name="keywords" content="career, guidance, mentorship, analytics, personalized recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://yourcareerquest.com" />
      </Head>

      <Navbar />

      <header className="text-center py-20 bg-gray-800">
        <h1 className="text-5xl font-bold mb-4">Discover Your Path with CareerQuest</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Unlock your potential and navigate your career journey with personalized insights and expert guidance.</p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/students" aria-label="Start your career quest">Start Your Quest</Link>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Why CareerQuest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Compass}
              title="Personalized Recommendations"
              description="Get tailored career suggestions based on your unique skills and interests."
            />
            <FeatureCard
              icon={BarChart2}
              title="Insightful Analytics"
              description="Visualize your strengths and growth areas with powerful analytical tools."
            />
            <FeatureCard
              icon={Users}
              title="Mentorship Matching"
              description="Connect with industry professionals for guidance and support in your chosen field."
            />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Powerful Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Career Interest Radar</CardTitle>
                <CardDescription className="text-gray-300">Visualize how your interests align with various career paths.</CardDescription>
              </CardHeader>
              <CardContent>
                <CareerInterestRadar
                  initialData={initialInterestData}
                  title="Your Career Interests"
                  onDataChange={handleDataChange}
                  chartColors={{
                    area: '#4CAF50',
                    stroke: '#4CAF50',
                    grid: '#757575',
                    text: '#FFFFFF',
                  }}
                />
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Strengths & Weaknesses Analysis</CardTitle>
                <CardDescription className="text-gray-300">Gain insights into your professional strengths and areas for improvement.</CardDescription>
              </CardHeader>
              <CardContent>
                <StrengthsWeaknessesBarChart />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center py-16 bg-gray-800 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to Shape Your Future?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join CareerQuest today and access a world of opportunities tailored just for you.</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard" aria-label="Join CareerQuest and start your journey">Join CareerQuest</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;