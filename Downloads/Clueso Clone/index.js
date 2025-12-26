/**
 * Backend Server - Express API Layer
 * 
 * ARCHITECTURE:
 * This file handles HTTP request/response logic and delegates AI processing
 * to the aiService module. This separation allows:
 * - API layer to focus on HTTP concerns (validation, status codes, error handling)
 * - AI service to focus on business logic (insight generation)
 * - Easy testing and future AI provider swaps
 */

const express = require('express');
const path = require('path');
const { generateInsights } = require('./services/aiService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

/**
 * POST /generate endpoint
 * 
 * API Contract:
 * - Input: { topic: string }
 * - Output: { result: string } | { error: string }
 * 
 * This endpoint receives user questions and returns structured insights.
 * It validates input, delegates to AI service, and handles errors gracefully.
 */
app.post('/generate', async (req, res) => {
  try {
    // Extract and validate input
    const { topic } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Please provide a valid question or topic to generate insights.' 
      });
    }

    // Delegate to AI service layer
    // This separation allows easy swapping of AI providers
    const result = generateInsights(topic);

    // Return structured response
    res.json({ result });
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error in /generate endpoint:', error);

    // Return user-friendly error message
    // Don't expose internal error details to client
    res.status(500).json({ 
      error: 'An error occurred while generating insights. Please try again.' 
    });
  }
});

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`🚀 Clueso Clone server is running on http://localhost:${PORT}`);
  console.log(`📝 Open your browser and navigate to http://localhost:${PORT}`);
});

