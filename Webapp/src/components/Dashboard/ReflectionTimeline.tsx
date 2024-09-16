"use client";

import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface Reflection {
  date: string;
  title: string;
  description: string;
}

const reflections: Reflection[] = [
  {
    date: '2024-01-15',
    title: 'Completed Career Discovery Quiz',
    description: 'Learned about my interests in technology and data science.',
  },
  {
    date: '2024-02-20',
    title: 'Earned Leadership Badge',
    description: 'Participated in the student council and led a community project.',
  },
  {
    date: '2024-03-10',
    title: 'Matched with Mentor',
    description: 'Connected with a software engineer for guidance.',
  },
];

const ReflectionTimeline: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Reflection Journals</h2>
      <VerticalTimeline>
        {reflections.map((reflection, index) => (
          <VerticalTimelineElement
            key={index}
            date={reflection.date}
            iconStyle={{ background: '#8884d8', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{reflection.title}</h3>
            <p>{reflection.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default ReflectionTimeline;
