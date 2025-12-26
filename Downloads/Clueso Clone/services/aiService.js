/**
 * AI Service Layer
 * 
 * ARCHITECTURAL DECISION:
 * This service is separated from the API route handler to maintain
 * clear separation of concerns. The API layer handles HTTP requests,
 * while this service handles AI processing logic.
 * 
 * WHY MOCKED:
 * This implementation uses mock AI responses to:
 * 1. Demonstrate the architecture without requiring API keys
 * 2. Show how the system would work with real AI integration
 * 3. Allow testing and demo without external dependencies
 * 4. Keep the assignment focused on product/engineering fundamentals
 * 
 * INTEGRATION PATH:
 * To integrate real AI APIs (OpenAI/Gemini), replace the generateInsights()
 * function body with:
 * 
 * OpenAI Example:
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{ role: "user", content: prompt }]
 *   });
 *   return formatResponse(response.choices[0].message.content);
 * 
 * Gemini Example:
 *   const model = genai.getGenerativeModel({ model: "gemini-pro" });
 *   const result = await model.generateContent(prompt);
 *   return formatResponse(result.response.text());
 */

/**
 * Generates structured insights from a user question
 * 
 * This function transforms raw user questions into structured, actionable insights
 * following Clueso.io's core value proposition.
 * 
 * @param {string} question - The user's question or topic
 * @returns {string} - Formatted structured response with Summary, Key Points, Steps, and Example
 */
function generateInsights(question) {
  // Input validation and normalization
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    throw new Error('Question cannot be empty');
  }

  // Capitalize first letter for better presentation
  const questionTitle = cleanQuestion.charAt(0).toUpperCase() + cleanQuestion.slice(1);

  // Generate structured response
  // In production, this would call OpenAI/Gemini with a carefully crafted prompt
  const result = `📌 Summary
${questionTitle} is a fundamental concept that plays an important role in understanding how things work. It involves key principles and practical applications that can be applied in real-world scenarios.

📌 Key Points
• Core concept: Understanding the basic definition and purpose
• Main components: Breaking down into essential parts
• Practical applications: How it's used in everyday situations
• Benefits: Why it matters and what problems it solves
• Common misconceptions: What people often get wrong

📌 Step-by-Step Explanation
Step 1: Start with the basics - Define what ${questionTitle} means in simple terms
Step 2: Identify the main components - Break it down into smaller, understandable pieces
Step 3: Understand the process - Explain how these components work together
Step 4: See it in action - Show how it applies to real situations
Step 5: Practice and apply - Use this knowledge to solve problems

📌 One Real-World Example
Imagine you're learning about ${questionTitle}. A practical example would be: When you use ${questionTitle} in your daily life, you might notice how it helps you understand complex ideas more easily. For instance, if you're trying to explain ${questionTitle} to a friend, you would break it down into simple steps, use relatable examples, and show them how it connects to things they already know. This approach makes learning more effective and memorable.`;

  return result;
}

module.exports = {
  generateInsights
};

