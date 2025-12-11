"use client";

import React from 'react';
import { Calendar, Award, Mail, ExternalLink, Star } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  bio: string;
  availability?: string;
  profilePicture?: string;
  contactLink?: string;
  rating?: number;
}

interface MentorCardProps {
  mentor: Mentor;
}

// Generate avatar background based on name
const getAvatarGradient = (name: string): string => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-orange-500',
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const gradient = getAvatarGradient(mentor.name);
  const initials = getInitials(mentor.name);

  return (
    <div className="group card-elevated relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Avatar */}
        {mentor.profilePicture ? (
          <img
            src={mentor.profilePicture}
            alt={`${mentor.name}'s profile`}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-700/50"
          />
        ) : (
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
        )}

        {/* Name & Expertise */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-primary-400 transition-colors">
            {mentor.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Award className="w-4 h-4 text-accent-400 flex-shrink-0" />
            <span className="text-sm text-accent-400 font-medium truncate">
              {mentor.expertise}
            </span>
          </div>
          {mentor.rating && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(mentor.rating!) 
                      ? 'text-amber-400 fill-amber-400' 
                      : 'text-slate-600'
                  }`}
                />
              ))}
              <span className="text-xs text-slate-400 ml-1">
                {mentor.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
        {mentor.bio}
      </p>

      {/* Availability */}
      {mentor.availability && (
        <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <Calendar className="w-4 h-4 text-primary-400 flex-shrink-0" />
          <span className="text-sm text-slate-300">
            Available: <span className="text-white font-medium">{mentor.availability}</span>
          </span>
        </div>
      )}

      {/* Action Button */}
      <div className="flex gap-3">
        {mentor.contactLink ? (
          <a
            href={mentor.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Contact Mentor
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300">
            <Mail className="w-4 h-4" />
            Request Contact
          </button>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
