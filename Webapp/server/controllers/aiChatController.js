import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: "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",
});

// Chatbot handler function
export const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
            role: "system",
            content: "From now on, you are my personal Career Mentor Assistant. Your primary role is to provide insightful, tailored, and professional guidance to help me navigate my career path effectively. Whether I need advice on career planning, interview preparation, resume building, networking strategies, or exploring new industries and opportunities, your responses should be crafted as if you're an experienced mentor with a deep understanding of my goals, skills, and aspirations. Use examples, actionable advice, and expert insights to ensure that I can make informed and impactful career decisions.",
          },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-70b-versatile",
    });

    const aiResponse = completion.choices[0]?.message?.content || "No response generated.";
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Failed to process AI request:", error);
    res.status(500).json({ error: "Failed to process AI request" });
  }
};