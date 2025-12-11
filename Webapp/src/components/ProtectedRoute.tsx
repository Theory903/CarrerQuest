"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  redirectTo = '/students' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Store the intended destination
        sessionStorage.setItem('careerquest_redirect', pathname);
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, router, redirectTo, pathname]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-10 h-10 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// Guest-only route (redirect authenticated users)
export function GuestRoute({ 
  children, 
  redirectTo = '/dashboard' 
}: { 
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Check for stored redirect
        const stored = sessionStorage.getItem('careerquest_redirect');
        if (stored) {
          sessionStorage.removeItem('careerquest_redirect');
          router.push(stored);
        } else {
          router.push(redirectTo);
        }
      } else {
        setIsChecking(false);
      }
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-10 h-10 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

