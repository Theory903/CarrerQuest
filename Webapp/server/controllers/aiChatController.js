import Groq from 'groq-sdk';

// Lazy initialization of Groq client
let groq = null;
const getGroqClient = () => {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || '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',
    });
  }
  return groq;
};

// In-memory conversation storage (use Redis in production)
const conversations = new Map();

const SYSTEM_PROMPT = `You are CareerQuest AI Mentor - an expert career counselor with deep knowledge across industries, job markets, and career development strategies.

Your capabilities:
1. **Career Guidance**: Provide personalized career path recommendations based on skills, interests, and goals
2. **Industry Insights**: Share current trends, salary expectations, and growth opportunities in various fields
3. **Skill Assessment**: Help identify strengths, weaknesses, and skill gaps
4. **Interview Prep**: Offer interview tips, common questions, and best practices
5. **Resume/CV Advice**: Guide on creating impactful resumes and portfolios
6. **Networking**: Share strategies for professional networking and personal branding
7. **Education Paths**: Recommend courses, certifications, and learning resources

Guidelines:
- Be encouraging, supportive, and constructive
- Provide actionable, specific advice
- Use examples and real-world scenarios when helpful
- Consider the user's context (student, career changer, professional)
- Be honest about uncertainties and recommend professional help when needed
- Keep responses concise but comprehensive (aim for 150-300 words)
- Use bullet points and formatting for clarity when appropriate

Remember: You're helping shape someone's future career. Be thoughtful and thorough.`;

// Main chat endpoint
export const getAIResponse = async (req, res) => {
  try {
    const { message, conversationId, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    // Get or create conversation history
    const convId = conversationId || `conv_${Date.now()}`;
    let history = conversations.get(convId) || [];

    // Build messages array with history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Add context if provided
    if (context) {
      messages[0].content += `\n\nUser Context:\n${JSON.stringify(context, null, 2)}`;
    }

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      stream: false,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    // Update conversation history
    history.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    );
    conversations.set(convId, history);

    // Clean up old conversations (older than 1 hour)
    const oneHourAgo = Date.now() - 3600000;
    for (const [key, value] of conversations.entries()) {
      if (parseInt(key.split('_')[1]) < oneHourAgo) {
        conversations.delete(key);
      }
    }

    res.json({
      response: aiResponse,
      conversationId: convId,
      usage: completion.usage
    });

  } catch (error) {
    console.error('AI Chat Error:', error.message);
    
    // Handle specific errors
    if (error.message?.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'AI service is busy. Please try again in a moment.',
        fallback: true 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to process your request. Please try again.',
      fallback: true
    });
  }
};

// Career analysis endpoint
export const analyzeCareer = async (req, res) => {
  try {
    const { skills, interests, education, experience, goals } = req.body;

    if (!skills || !interests) {
      return res.status(400).json({ error: 'Skills and interests are required' });
    }

    const analysisPrompt = `Based on the following profile, provide a detailed career analysis:

**Skills**: ${Array.isArray(skills) ? skills.join(', ') : skills}
**Interests**: ${Array.isArray(interests) ? interests.join(', ') : interests}
**Education**: ${education || 'Not specified'}
**Experience**: ${experience || 'Entry level'}
**Career Goals**: ${goals || 'Open to suggestions'}

Please provide:
1. **Top 5 Recommended Career Paths** - With brief explanations why each fits
2. **Skill Gap Analysis** - What skills should be developed
3. **Immediate Action Items** - 3 specific steps to take now
4. **Long-term Strategy** - 6-month career development plan
5. **Resources** - Suggested courses, certifications, or experiences

Format your response clearly with headers and bullet points.`;

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { role: 'system', content: 'You are an expert career analyst. Provide detailed, actionable career guidance.' },
        { role: 'user', content: analysisPrompt }
      ],
      temperature: 0.6,
      max_tokens: 2000,
    });

    res.json({
      analysis: completion.choices[0]?.message?.content,
      profile: { skills, interests, education, experience, goals }
    });

  } catch (error) {
    console.error('Career Analysis Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze career profile' });
  }
};

// Clear conversation
export const clearConversation = (req, res) => {
  const { conversationId } = req.body;
  if (conversationId && conversations.has(conversationId)) {
    conversations.delete(conversationId);
  }
  res.json({ success: true, message: 'Conversation cleared' });
};

export default { getAIResponse, analyzeCareer, clearConversation };

