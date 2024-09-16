// Mentor Card Component
import React from 'react';

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  bio: string;
  profilePicture?: string; // Optional field for a profile picture
  contactLink?: string; // Optional field for a contact link
}

interface MentorshipCardProps {
  mentor: Mentor;
}

const MentorshipCard: React.FC<MentorshipCardProps> = ({ mentor }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {mentor.profilePicture && (
        <img
          src={mentor.profilePicture}
          alt={`${mentor.name}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-center">{mentor.name}</h3>
      <p className="text-sm text-gray-400 mb-2 text-center">Expertise: {mentor.expertise}</p>
      <p className="text-gray-300 mb-4">{mentor.bio}</p>
      {mentor.contactLink && (
        <a
          href={mentor.contactLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-400 hover:text-blue-500 transition-colors"
        >
          Contact {mentor.name}
        </a>
      )}
    </div>
  );
};

export default MentorshipCard;