"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { BarChart2, Compass, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerInterestRadar from "@/components/Dashboard/CareerInterestRadar";
import StrengthsWeaknessesBarChart from "@/components/Dashboard/StrengthsWeaknessesBarChart";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card
    className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 relative group"
    aria-label={title}
  >
    <div
      className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-blue-500 transition duration-300"
      aria-hidden="true"
    ></div>
    <CardHeader className="text-center relative z-10">
      <Icon className="w-14 h-14 mb-4 text-blue-500 group-hover:text-purple-400 transition-colors duration-300" aria-hidden="true" />
      <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <CardDescription className="text-gray-300 text-sm">{description}</CardDescription>
    </CardContent>
  </Card>
);

interface InsightCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description, children }) => (
  <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-white text-2xl font-bold">{title}</CardTitle>
      <CardDescription className="text-gray-300">{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Head>
        <title>CareerQuest | Navigate Your Future</title>
        <meta
          name="description"
          content="CareerQuest: Your ultimate career navigation tool for personalized recommendations, analytics, and mentorship matching."
        />
        <meta name="keywords" content="career, guidance, mentorship, analytics, personalized recommendations" />
        <meta property="og:title" content="CareerQuest | Navigate Your Future" />
        <meta
          property="og:description"
          content="Your ultimate career navigation tool for personalized recommendations, analytics, and mentorship matching."
        />
        <meta property="og:image" content="/assets/images/career-quest-banner.png" />
        <meta property="og:url" content="https://yourcareerquest.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />

      <header className="text-center py-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Discover Your Path with CareerQuest</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Unlock your potential and navigate your career journey with personalized insights and expert guidance.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/students" aria-label="Start your career quest">
            Start Your Quest
          </Link>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Why CareerQuest Section */}
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

        {/* Insights Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Powerful Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <InsightCard
              title="Career Interest Radar"
              description="Visualize how your interests align with various career paths."
            >
              <CareerInterestRadar />
            </InsightCard>
            <InsightCard
              title="Strengths & Weaknesses Analysis"
              description="Gain insights into your professional strengths and areas for improvement."
            >
              <StrengthsWeaknessesBarChart />
            </InsightCard>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center py-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to Shape Your Future?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join CareerQuest today and access a world of opportunities tailored just for you.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard" aria-label="Join CareerQuest and start your journey">
              Join CareerQuest
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;