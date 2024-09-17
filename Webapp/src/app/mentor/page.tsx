// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import GlobalNavbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import ChatUI from "@/components/Chatbot";
// import { AssistantRuntimeProvider, useEdgeRuntime, CompositeAttachmentAdapter, SimpleImageAttachmentAdapter, SimpleTextAttachmentAdapter } from "@assistant-ui/react";

// // Define MyRuntimeProvider to provide the Assistant runtime
// const MyRuntimeProvider = ({ children }: { children: React.ReactNode }) => {
//   const runtime = useEdgeRuntime({
//     api: "/api/chat",
//     adapters: {
//       attachments: new CompositeAttachmentAdapter([
//         new SimpleImageAttachmentAdapter(),
//         new SimpleTextAttachmentAdapter(),
//       ]),
//     },
//   });
//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       {children}
//     </AssistantRuntimeProvider>
//   );
// };

// // Main App component
// const App: React.FC = () => {
//   const router = useRouter();

//   return (
//     <div className="App min-h-screen flex flex-col">
//       <GlobalNavbar />
//       <main className="App-main flex-grow container mx-auto p-100">
//         {router.pathname === '/mentor' && (
//           <MyRuntimeProvider>
//             <ChatUI />
//           </MyRuntimeProvider>
//         )}
//         {/* Add other conditions for different routes if needed */}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;``