import Groq from 'groq-sdk';
import { v4 as uuidv4 } from 'uuid';

// Lazy initialization of Groq client
let groq = null;
const getGroqClient = () => {
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is required');
    }
    groq = new Groq({
      apiKey: apiKey,
    });
  }
  return groq;
};

// In-memory quiz storage
const quizSessions = new Map();
const quizResults = new Map();

// Comprehensive personality quiz questions based on Big Five + Holland Codes + Career Anchors
const QUIZ_QUESTIONS = [
  // OPENNESS (Curiosity, Creativity)
  {
    id: 1,
    category: 'openness',
    text: 'When faced with a new and unfamiliar task, how do you typically respond?',
    options: [
      { text: 'I get excited and dive in to explore', score: 5 },
      { text: 'I approach it cautiously but with interest', score: 4 },
      { text: 'I prefer to stick with what I know works', score: 2 },
      { text: 'I feel uncomfortable and avoid it if possible', score: 1 }
    ]
  },
  {
    id: 2,
    category: 'openness',
    text: 'How often do you seek out new experiences or ideas?',
    options: [
      { text: 'Constantly - I love discovering new things', score: 5 },
      { text: 'Regularly - I enjoy variety', score: 4 },
      { text: 'Occasionally - when necessary', score: 2 },
      { text: 'Rarely - I prefer routine', score: 1 }
    ]
  },
  // CONSCIENTIOUSNESS (Organization, Discipline)
  {
    id: 3,
    category: 'conscientiousness',
    text: 'How do you approach planning and organizing your work?',
    options: [
      { text: 'I create detailed plans and follow them strictly', score: 5 },
      { text: 'I make general plans but stay flexible', score: 4 },
      { text: 'I prefer to figure things out as I go', score: 2 },
      { text: 'I work best without plans or structure', score: 1 }
    ]
  },
  {
    id: 4,
    category: 'conscientiousness',
    text: 'When working on a long-term project, how do you maintain focus?',
    options: [
      { text: 'I set milestones and track progress diligently', score: 5 },
      { text: 'I stay motivated by the end goal', score: 4 },
      { text: 'I work in bursts when inspiration strikes', score: 2 },
      { text: 'I often struggle to maintain focus', score: 1 }
    ]
  },
  // EXTRAVERSION (Social Energy, Assertiveness)
  {
    id: 5,
    category: 'extraversion',
    text: 'In a team setting, which role feels most natural to you?',
    options: [
      { text: 'Leading discussions and coordinating efforts', score: 5 },
      { text: 'Contributing ideas and collaborating actively', score: 4 },
      { text: 'Supporting others and doing assigned tasks', score: 2 },
      { text: 'Working independently on my portion', score: 1 }
    ]
  },
  {
    id: 6,
    category: 'extraversion',
    text: 'How do you recharge after a busy day?',
    options: [
      { text: 'Going out with friends or meeting new people', score: 5 },
      { text: 'Spending time with close friends or family', score: 4 },
      { text: 'A mix of social time and alone time', score: 3 },
      { text: 'Quiet time alone to decompress', score: 1 }
    ]
  },
  // AGREEABLENESS (Cooperation, Empathy)
  {
    id: 7,
    category: 'agreeableness',
    text: 'When there\'s a conflict in your team, how do you respond?',
    options: [
      { text: 'I try to mediate and find a compromise', score: 5 },
      { text: 'I listen to all sides before taking a stance', score: 4 },
      { text: 'I stand firm on my position if I\'m right', score: 2 },
      { text: 'I avoid getting involved if possible', score: 1 }
    ]
  },
  {
    id: 8,
    category: 'agreeableness',
    text: 'How important is helping others succeed in your career?',
    options: [
      { text: 'It\'s my primary motivation', score: 5 },
      { text: 'Very important - I find it fulfilling', score: 4 },
      { text: 'Somewhat important, but I focus on my growth too', score: 3 },
      { text: 'I prioritize my own success first', score: 1 }
    ]
  },
  // NEUROTICISM (Emotional Stability)
  {
    id: 9,
    category: 'emotional_stability',
    text: 'How do you handle high-pressure situations or deadlines?',
    options: [
      { text: 'I stay calm and perform well under pressure', score: 5 },
      { text: 'I feel some stress but manage it effectively', score: 4 },
      { text: 'I get anxious but push through', score: 2 },
      { text: 'High pressure significantly affects my performance', score: 1 }
    ]
  },
  {
    id: 10,
    category: 'emotional_stability',
    text: 'After making a mistake at work, how do you typically feel?',
    options: [
      { text: 'I learn from it and move on quickly', score: 5 },
      { text: 'I feel disappointed but recover soon', score: 4 },
      { text: 'I dwell on it for a while', score: 2 },
      { text: 'I worry about it extensively', score: 1 }
    ]
  },
  // HOLLAND CODES - Realistic
  {
    id: 11,
    category: 'realistic',
    text: 'How do you feel about hands-on, practical work?',
    options: [
      { text: 'I love working with tools, machines, or physical tasks', score: 5 },
      { text: 'I enjoy it occasionally', score: 3 },
      { text: 'I prefer working with ideas or people', score: 2 },
      { text: 'I avoid hands-on work when possible', score: 1 }
    ]
  },
  // HOLLAND CODES - Investigative
  {
    id: 12,
    category: 'investigative',
    text: 'How much do you enjoy solving complex problems or puzzles?',
    options: [
      { text: 'I actively seek out challenging problems', score: 5 },
      { text: 'I enjoy them when they come up', score: 4 },
      { text: 'I prefer straightforward tasks', score: 2 },
      { text: 'I find them frustrating', score: 1 }
    ]
  },
  // HOLLAND CODES - Artistic
  {
    id: 13,
    category: 'artistic',
    text: 'How important is creative expression in your work?',
    options: [
      { text: 'Essential - I need creative freedom', score: 5 },
      { text: 'Important - I like having some creativity', score: 4 },
      { text: 'Nice to have but not essential', score: 2 },
      { text: 'I prefer structured, defined work', score: 1 }
    ]
  },
  // HOLLAND CODES - Social
  {
    id: 14,
    category: 'social',
    text: 'How fulfilling do you find work that directly helps or teaches others?',
    options: [
      { text: 'Extremely fulfilling - it\'s my calling', score: 5 },
      { text: 'Very fulfilling', score: 4 },
      { text: 'Somewhat fulfilling', score: 2 },
      { text: 'I prefer other types of work', score: 1 }
    ]
  },
  // HOLLAND CODES - Enterprising
  {
    id: 15,
    category: 'enterprising',
    text: 'How comfortable are you with persuading others or taking risks?',
    options: [
      { text: 'Very comfortable - I enjoy leading and influencing', score: 5 },
      { text: 'Comfortable when needed', score: 4 },
      { text: 'Somewhat uncomfortable', score: 2 },
      { text: 'I prefer to avoid these situations', score: 1 }
    ]
  },
  // HOLLAND CODES - Conventional
  {
    id: 16,
    category: 'conventional',
    text: 'How do you feel about detailed, organized work with clear procedures?',
    options: [
      { text: 'I thrive with structure and clear guidelines', score: 5 },
      { text: 'I appreciate having some structure', score: 4 },
      { text: 'I prefer flexibility over structure', score: 2 },
      { text: 'I dislike rigid procedures', score: 1 }
    ]
  },
  // Career Values
  {
    id: 17,
    category: 'career_values',
    text: 'What matters most to you in a career?',
    options: [
      { text: 'Making a positive impact on society', value: 'impact', score: 0 },
      { text: 'Financial security and growth', value: 'security', score: 0 },
      { text: 'Work-life balance and flexibility', value: 'balance', score: 0 },
      { text: 'Continuous learning and challenges', value: 'growth', score: 0 }
    ]
  },
  {
    id: 18,
    category: 'work_style',
    text: 'What type of work environment do you prefer?',
    options: [
      { text: 'Fast-paced startup environment', value: 'startup', score: 0 },
      { text: 'Established corporate structure', value: 'corporate', score: 0 },
      { text: 'Remote/flexible arrangement', value: 'remote', score: 0 },
      { text: 'Creative agency or studio', value: 'creative', score: 0 }
    ]
  },
  // Technical Aptitude
  {
    id: 19,
    category: 'technical',
    text: 'How comfortable are you with technology and learning new software?',
    options: [
      { text: 'Very comfortable - I learn quickly', score: 5 },
      { text: 'Comfortable with most technology', score: 4 },
      { text: 'I can learn if needed', score: 3 },
      { text: 'I prefer minimal technology use', score: 1 }
    ]
  },
  // Leadership
  {
    id: 20,
    category: 'leadership',
    text: 'Do you see yourself in a leadership or management role?',
    options: [
      { text: 'Yes, I aspire to lead teams', score: 5 },
      { text: 'Eventually, with more experience', score: 4 },
      { text: 'Maybe, if the opportunity arises', score: 3 },
      { text: 'I prefer individual contributor roles', score: 1 }
    ]
  }
];

// Get quiz questions
export const getQuizQuestions = (req, res) => {
  // Create a quiz session
  const sessionId = uuidv4();
  quizSessions.set(sessionId, {
    startedAt: new Date().toISOString(),
    answers: {},
    completed: false
  });

  // Return questions without scores
  const questions = QUIZ_QUESTIONS.map(q => ({
    id: q.id,
    category: q.category,
    text: q.text,
    options: q.options.map(o => ({ text: o.text, value: o.value }))
  }));

  res.json({
    sessionId,
    questions,
    totalQuestions: questions.length
  });
};

// Submit quiz answers
export const submitQuiz = async (req, res) => {
  try {
    const { sessionId, answers, userInfo } = req.body;

    if (!answers || Object.keys(answers).length < QUIZ_QUESTIONS.length) {
      return res.status(400).json({ error: 'Please answer all questions' });
    }

    // Calculate scores by category
    const scores = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      emotional_stability: 0,
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
      technical: 0,
      leadership: 0
    };

    const categoryCount = {};
    const careerValues = [];
    const workStyle = [];

    // Process answers
    QUIZ_QUESTIONS.forEach(question => {
      const answerIndex = answers[question.id];
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex];
        
        if (question.category === 'career_values') {
          careerValues.push(selectedOption.value);
        } else if (question.category === 'work_style') {
          workStyle.push(selectedOption.value);
        } else {
          scores[question.category] = (scores[question.category] || 0) + selectedOption.score;
          categoryCount[question.category] = (categoryCount[question.category] || 0) + 1;
        }
      }
    });

    // Normalize scores to percentages
    const normalizedScores = {};
    Object.keys(scores).forEach(category => {
      const count = categoryCount[category] || 1;
      normalizedScores[category] = Math.round((scores[category] / (count * 5)) * 100);
    });

    // Generate AI-powered career recommendations
    const analysisPrompt = `Based on the following personality assessment results, provide detailed career recommendations:

PERSONALITY PROFILE (Big Five):
- Openness: ${normalizedScores.openness}% (curiosity, creativity, openness to experience)
- Conscientiousness: ${normalizedScores.conscientiousness}% (organization, discipline, reliability)
- Extraversion: ${normalizedScores.extraversion}% (social energy, assertiveness)
- Agreeableness: ${normalizedScores.agreeableness}% (cooperation, empathy, helpfulness)
- Emotional Stability: ${normalizedScores.emotional_stability}% (stress management, resilience)

HOLLAND CAREER INTERESTS:
- Realistic (hands-on, practical): ${normalizedScores.realistic}%
- Investigative (analytical, research): ${normalizedScores.investigative}%
- Artistic (creative, expressive): ${normalizedScores.artistic}%
- Social (helping, teaching): ${normalizedScores.social}%
- Enterprising (leading, persuading): ${normalizedScores.enterprising}%
- Conventional (organizing, detailed): ${normalizedScores.conventional}%

OTHER FACTORS:
- Technical Aptitude: ${normalizedScores.technical}%
- Leadership Potential: ${normalizedScores.leadership}%
- Career Values: ${careerValues.join(', ')}
- Preferred Work Environment: ${workStyle.join(', ')}

${userInfo ? `User Info: ${userInfo.education || 'Student'}, ${userInfo.experience || 'Entry level'}` : ''}

Please provide a comprehensive career report with:

1. **PERSONALITY SUMMARY** (2-3 sentences describing the overall personality type)

2. **TOP 5 CAREER MATCHES** (List careers that strongly align with this profile, with match percentage and brief explanation)

3. **PERSONALITY STRENGTHS** (3-4 key strengths based on the profile)

4. **AREAS FOR DEVELOPMENT** (2-3 areas that could be improved for career success)

5. **RECOMMENDED CAREER PATHS**:
   - Best Fit Careers (detailed list with reasons)
   - Alternative Paths Worth Exploring
   - Careers to Approach with Caution

6. **ACTIONABLE NEXT STEPS** (5 specific actions to take based on this profile)

7. **LEARNING RECOMMENDATIONS** (Courses, certifications, or skills to develop)

Format the response clearly with headers and bullet points. Be specific and actionable.`;

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { 
          role: 'system', 
          content: 'You are an expert career psychologist and counselor. Provide detailed, insightful, and actionable career guidance based on personality assessments. Be encouraging but realistic.' 
        },
        { role: 'user', content: analysisPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const aiAnalysis = completion.choices[0]?.message?.content || '';

    // Generate result ID and store results
    const resultId = uuidv4();
    const result = {
      id: resultId,
      sessionId,
      completedAt: new Date().toISOString(),
      scores: normalizedScores,
      careerValues,
      workStyle,
      aiAnalysis,
      userInfo: userInfo || null
    };

    quizResults.set(resultId, result);

    // Update session
    if (sessionId && quizSessions.has(sessionId)) {
      const session = quizSessions.get(sessionId);
      session.completed = true;
      session.resultId = resultId;
      quizSessions.set(sessionId, session);
    }

    res.json({
      success: true,
      resultId,
      scores: normalizedScores,
      careerValues,
      workStyle,
      analysis: aiAnalysis
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ error: 'Failed to process quiz results' });
  }
};

// Get quiz result
export const getQuizResult = (req, res) => {
  const { resultId } = req.params;
  
  const result = quizResults.get(resultId);
  if (!result) {
    return res.status(404).json({ error: 'Result not found' });
  }

  res.json(result);
};

export default { getQuizQuestions, submitQuiz, getQuizResult };

