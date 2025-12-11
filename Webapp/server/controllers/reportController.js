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

// In-memory report storage
const reports = new Map();

// Generate comprehensive student report
export const generateReport = async (req, res) => {
  try {
    const { 
      studentInfo,
      quizResults,
      academicData,
      goals,
      interests,
      skills
    } = req.body;

    // Build comprehensive profile
    const profile = {
      name: studentInfo?.name || 'Student',
      education: studentInfo?.education || 'Not specified',
      academicPerformance: academicData || {},
      personalityScores: quizResults?.scores || {},
      careerValues: quizResults?.careerValues || [],
      workStyle: quizResults?.workStyle || [],
      goals: goals || [],
      interests: interests || [],
      skills: skills || []
    };

    // Generate AI-powered comprehensive report
    const reportPrompt = `Generate a comprehensive career guidance report for a student with the following profile:

**STUDENT PROFILE**
Name: ${profile.name}
Education Level: ${profile.education}

**ACADEMIC PERFORMANCE**
${Object.entries(profile.academicPerformance).map(([subject, score]) => `- ${subject}: ${score}%`).join('\n') || 'Not provided'}

**PERSONALITY ASSESSMENT RESULTS**
${Object.entries(profile.personalityScores).map(([trait, score]) => `- ${trait}: ${score}%`).join('\n') || 'Not completed'}

**CAREER VALUES**
${profile.careerValues.join(', ') || 'Not specified'}

**PREFERRED WORK ENVIRONMENT**
${profile.workStyle.join(', ') || 'Not specified'}

**CURRENT GOALS**
${profile.goals.map(g => `- ${g.name}: ${g.progress}% complete`).join('\n') || 'None specified'}

**INTERESTS**
${profile.interests.join(', ') || 'Not specified'}

**SKILLS**
${profile.skills.join(', ') || 'Not specified'}

Please generate a COMPREHENSIVE CAREER GUIDANCE REPORT with the following sections:

## 1. EXECUTIVE SUMMARY
A brief overview of the student's profile, key strengths, and primary career direction (3-4 sentences).

## 2. PERSONALITY & STRENGTHS ANALYSIS
- Detailed analysis of personality traits
- Key strengths that will benefit their career
- Unique value proposition

## 3. CAREER COMPATIBILITY MATRIX
Top 10 career paths ranked by compatibility, with:
- Career name
- Match score (%)
- Why it's a good fit
- Potential challenges
- Entry requirements

## 4. SKILL GAP ANALYSIS
- Current skills assessment
- Required skills for recommended careers
- Priority skills to develop
- Recommended learning resources

## 5. ACADEMIC INSIGHTS
- Analysis of academic strengths
- Subjects to focus on
- How academics align with career goals

## 6. 90-DAY ACTION PLAN
Week-by-week breakdown of:
- Immediate actions (Week 1-2)
- Skill development (Week 3-6)
- Exploration activities (Week 7-9)
- Application/networking (Week 10-12)

## 7. MENTORSHIP & NETWORKING RECOMMENDATIONS
- Type of mentors to seek
- Professional communities to join
- Networking strategies

## 8. POTENTIAL CHALLENGES & MITIGATION
- Likely obstacles
- Strategies to overcome them

## 9. LONG-TERM CAREER ROADMAP
- 1-year milestones
- 3-year vision
- 5-year career trajectory

## 10. PERSONALIZED ADVICE
A personal message with encouragement and specific advice tailored to this student.

Make the report detailed, actionable, and encouraging. Use specific examples and recommendations.`;

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { 
          role: 'system', 
          content: `You are an expert career counselor creating a professional career guidance report. 
Be thorough, specific, and actionable. Format the report professionally with clear sections.
Use markdown formatting for headers and lists.
Be encouraging but realistic about career paths and requirements.`
        },
        { role: 'user', content: reportPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const reportContent = completion.choices[0]?.message?.content || '';

    // Generate report ID and store
    const reportId = uuidv4();
    const report = {
      id: reportId,
      generatedAt: new Date().toISOString(),
      profile,
      content: reportContent,
      sections: parseReportSections(reportContent)
    };

    reports.set(reportId, report);

    res.json({
      success: true,
      reportId,
      report: report.content,
      generatedAt: report.generatedAt
    });

  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

// Parse report into sections
function parseReportSections(content) {
  const sections = {};
  const sectionRegex = /## (\d+)\. ([^\n]+)\n([\s\S]*?)(?=## \d+\.|$)/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const sectionNumber = match[1];
    const sectionTitle = match[2].trim();
    const sectionContent = match[3].trim();
    
    sections[`section_${sectionNumber}`] = {
      title: sectionTitle,
      content: sectionContent
    };
  }

  return sections;
}

// Get report by ID
export const getReport = (req, res) => {
  const { reportId } = req.params;
  
  const report = reports.get(reportId);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  res.json(report);
};

// Generate quick insights (lighter version)
export const getQuickInsights = async (req, res) => {
  try {
    const { skills, interests, education } = req.body;

    const insightPrompt = `Based on:
Skills: ${skills?.join(', ') || 'Not specified'}
Interests: ${interests?.join(', ') || 'Not specified'}
Education: ${education || 'Not specified'}

Provide quick career insights:
1. Top 3 career matches (with brief reasons)
2. One key strength to leverage
3. One skill to develop immediately
4. One actionable step to take this week

Keep response under 300 words.`;

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { role: 'system', content: 'Provide brief, actionable career insights.' },
        { role: 'user', content: insightPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({
      insights: completion.choices[0]?.message?.content
    });

  } catch (error) {
    console.error('Quick insights error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
};

// Compare career paths
export const compareCarers = async (req, res) => {
  try {
    const { careers, studentProfile } = req.body;

    if (!careers || careers.length < 2) {
      return res.status(400).json({ error: 'Please provide at least 2 careers to compare' });
    }

    const comparePrompt = `Compare these career paths for a student:
Careers: ${careers.join(' vs ')}

Student Profile:
${studentProfile ? JSON.stringify(studentProfile, null, 2) : 'General student'}

Provide a detailed comparison including:
1. Salary expectations
2. Job market demand
3. Required skills
4. Growth potential
5. Work-life balance
6. Entry barriers
7. Best fit recommendation with reasoning

Format as a clear comparison table/list.`;

    const completion = await getGroqClient().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        { role: 'system', content: 'Provide detailed, objective career comparisons.' },
        { role: 'user', content: comparePrompt }
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });

    res.json({
      comparison: completion.choices[0]?.message?.content
    });

  } catch (error) {
    console.error('Career comparison error:', error);
    res.status(500).json({ error: 'Failed to compare careers' });
  }
};

export default { generateReport, getReport, getQuickInsights, compareCarers };

