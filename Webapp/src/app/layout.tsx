import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";

// Import custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "CareerQuest | Navigate Your Future",
  description: "AI-powered career guidance platform helping students discover their ideal career paths with personalized recommendations, expert mentorship, and visual analytics.",
  keywords: "career guidance, AI career advisor, career quiz, mentorship, career path, job recommendations",
  authors: [{ name: "FeedMind Team" }],
  openGraph: {
    title: "CareerQuest | Navigate Your Future",
    description: "Discover your ideal career path with AI-powered insights and expert mentorship.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerQuest | Navigate Your Future",
    description: "Discover your ideal career path with AI-powered insights and expert mentorship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
