"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatUI from "@/components/Chatbot";
import { AssistantRuntimeProvider, useEdgeRuntime, CompositeAttachmentAdapter, SimpleImageAttachmentAdapter, SimpleTextAttachmentAdapter } from "@assistant-ui/react";

// Define MyRuntimeProvider to provide the Assistant runtime
const MyRuntimeProvider = ({ children }: { children: React.ReactNode }) => {
  const runtime = useEdgeRuntime({
    api: "/api/chat",
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
      ]),
    },
  });
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <GlobalNavbar />
        <main className="App-main flex-grow container mx-auto p-100">
          <Routes>
            {/* Other routes */}
            <Route path="/mentor" element={<MyRuntimeProvider><ChatUI /></MyRuntimeProvider>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
