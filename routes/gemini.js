const GEMINI_API_KEY= "AIzaSyCvfFfIlXjuSg398y8KFR50gooU10_X-uo"

const express = require('express');
const axios = require('axios');
const router = express.Router();

// const GEMINI_API_KEY = "AIerSyCvfFskoejuSg398y8KFR50gooU10_X-uo"

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
  You are an expert AI legal assistant. Based on Indian divorce laws, give a short and clear estimate of monthly alimony liability with minimal explanation.
  
  📌 Client Details:
  - Husband's Age: ${data.husbandAge}
  - Wife's Age: ${data.wifeAge}
  - Marriage Duration: ${data.duration} years
  - Husband's Employment Type: ${data.husbandEmploymentType || "Not provided"}
  - Husband's Monthly Income: ₹${data.husbandIncome}
  - Wife's Monthly Income: ₹${data.wifeIncome}
  - Wife's Education Level: ${data.wifeEducation}
  - Wife's Health Condition: ${data.wifeHealthCondition || "Not provided"}
  - Wife Sacrificed Career: ${data.careerSacrifice ? "Yes" : "No"}
  - Domestic Abuse Reported: ${data.domesticAbuse ? "Yes" : "No"}
  - Number of Children: ${data.children}
  - Custody Decision: ${data.custodyDecision || "Undecided"}
  - Living Standard: ${data.livingStandard || "Not mentioned"}
  - Joint Assets (house, land, etc): ${data.jointAssets || "Not provided"}
  - Divorce Filed By: ${data.divorceFiledBy || "Not mentioned"}
  - Additional Notes: ${data.otherDetails || "None"}
  
  📎 Response Format: Directly start with 1 . 
  1. Estimated Alimony (₹/month): ₹[amount]
  2. Duration or lump-sum estimate if applicable
  3. Any legal consequences (e.g. asset division, child custody impact)
  4. Suggested legal steps (consultation, mediation, documentation)
  Directly start with 1 .
  
  Only return precise, legal points. Avoid repeating the inputs.
  `;
  }
  
  

  
  
  
  module.exports = router;

module.exports = router;
