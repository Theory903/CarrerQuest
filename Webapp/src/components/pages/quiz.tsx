"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "How do you typically approach problem-solving?",
        options: ["Analytically", "Creatively", "Collaboratively", "Intuitively"]
      },
      {
        id: 2,
        text: "In a group project, which role do you prefer?",
        options: ["Leader", "Researcher", "Presenter", "Organizer"]
      },
      {
        id: 3,
        text: "How do you prefer to learn new information?",
        options: ["Reading", "Listening", "Hands-on practice", "Visual aids"]
      },
      {
        id: 4,
        text: "What type of work environment do you thrive in?",
        options: ["Quiet and structured", "Dynamic and collaborative", "Flexible and independent", "Competitive and fast-paced"]
      },
      {
        id: 5,
        text: "How do you handle stress?",
        options: ["Exercise", "Meditation", "Talking to friends", "Organizing and planning"]
      },
      {
        id: 6,
        text: "What motivates you the most?",
        options: ["Financial rewards", "Personal growth", "Recognition", "Making a difference"]
      },
      {
        id: 7,
        text: "How do you prefer to communicate?",
        options: ["In-person conversations", "Written messages", "Phone calls", "Video chats"]
      },
      {
        id: 8,
        text: "What's your preferred way of expressing creativity?",
        options: ["Writing", "Visual arts", "Music", "Problem-solving"]
      },
      {
        id: 9,
        text: "How do you approach decision-making?",
        options: ["Logically", "Emotionally", "Instinctively", "Collaboratively"]
      },
      {
        id: 10,
        text: "What's your ideal work-life balance?",
        options: ["Strict separation", "Flexible integration", "Work-focused", "Life-focused"]
      }
];

const PersonalityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setAnswers({...answers, [currentQuestion]: selectedAnswer});
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const moveToDashboard = () => {
    // Here you would typically save the quiz results to your backend
    // before navigating to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>CareerQuest | Personality Quiz</title>
        <meta name="description" content="Take our personality quiz to get personalized career recommendations." />
      </Head>

      <Navbar />

      <header className="text-center py-16 bg-gray-800">
        <h1 className="text-5xl font-bold mb-4">Personality Check Quiz</h1>
        <p className="text-lg mb-8">Discover your career interests and strengths through our personality assessment.</p>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          {!quizCompleted ? (
            <>
              <h2 className="text-3xl font-bold mb-6">Question {currentQuestion + 1} of {questions.length}</h2>
              <p className="text-xl mb-8">{questions[currentQuestion].text}</p>
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded ${
                      selectedAnswer === option ? 'bg-blue-600' : 'bg-gray-700'
                    } hover:bg-blue-500 transition-colors`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`w-full py-3 rounded-lg text-lg ${
                  selectedAnswer ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                } transition-colors`}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
              <p className="text-xl mb-8">Thank you for completing the personality check. Your results have been analyzed to provide career recommendations.</p>
              <div className="space-y-4">
                <button
                  onClick={moveToDashboard}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
                >
                  Move to Your Dashboard
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-600 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonalityQuiz;