const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEMINI_API_KEY = "AIzaSyCvfFfIlXjuSg398y8KFR50gooU10_X-uo"

router.post('/', async (req, res) => {
    const userInput = req.body;
  
    const prompt = generatePrompt(userInput);
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      const reply = response.data.candidates[0].content.parts[0].text;
      res.json({ reply });
  
    } catch (err) {
      console.error('Gemini API Error:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to get response from Gemini API' });
    }
  });
  
  function generatePrompt(data) {
    return `
  You are an expert AI legal assistant. Based on Indian divorce laws and current legal practices, suggest a rough estimate and legal advice regarding alimony using the following client details:
  
  🔹 Basic Information:
  - Age of Husband: ${data.husbandAge} years
  - Age of Wife: ${data.wifeAge} years
  - Marriage Duration: ${data.duration} years
  - Number of Children: ${data.children}
  - Divorce Filed By: ${data.divorceFiledBy}
  - Domestic Abuse Reported: ${data.domesticAbuse ? "Yes" : "No"}
  
  🔹 Financial Details:
  - Husband's Monthly Income: ₹${data.husbandIncome}
  - Wife's Monthly Income: ₹${data.wifeIncome}
  - Wife's Education Level: ${data.wifeEducation}
  - Did Wife Sacrifice Career for Family?: ${data.careerSacrifice ? "Yes" : "No"}
  
  🔹 Assets Owned:
  ${data.assets || "Not provided"}
  
  🔹 Additional Notes by User:
  ${data.otherDetails || "None"}
  
  💡 Instructions:
  - Based on all of the above, estimate how much alimony the husband might be liable to pay per month.
  - Consider the ASSETS while estimating alimony — whether they should impact the amount or be shared.
  - Clearly explain why the estimated amount is fair or reasonable under Indian legal practices.
  - Keep the tone clear, helpful, and easy to understand for a general user.dont tell what i had given to you. the answer should be short and should be point wise.
   - also the amount should be first and then yourr short suggestion
  `;
  }
  
  
  
  module.exports = router;

module.exports = router;
