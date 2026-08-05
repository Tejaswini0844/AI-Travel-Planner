require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the AI Trip Planner backend!');
});

app.post('/plan-trip', async (req, res) => {
  const { city, days, budget } = req.body;

  const prompt = `Create a detailed ${days}-day trip itinerary for ${city}, India with a budget of ₹${budget} per day.

Respond ONLY with valid JSON, no extra text, no markdown formatting, no code blocks. Use this exact structure:

{
  "days": [
    {
      "day": 1,
      "title": "short catchy theme for the day, e.g. The Grand Forts & Sunset Views",
      "morning": "detailed narrative with specific place names, local-friend tone",
      "afternoon": "detailed narrative with specific place names",
      "evening": "detailed narrative with specific place names",
      "food": "specific local food spots with names, prices, and tourist-trap warnings",
      "costBreakdown": {
        "stay": 500,
        "transport": 200,
        "food": 300,
        "activities": 200
      },
      "dayTotal": 1200
    }
  ]
}

Make costBreakdown values realistic for the given budget of ₹${budget}/day, and make sure dayTotal equals the sum of costBreakdown values. Write like advice from a local friend, not a generic travel website. Include all ${days} days.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );


    const data = await response.json();
    let itineraryText = data.candidates[0].content.parts[0].text;

    // Remove markdown code block formatting if Gemini adds it anyway
    itineraryText = itineraryText.replace(/```json/g, '').replace(/```/g, '').trim();

    const itineraryJson = JSON.parse(itineraryText);

    res.json({ itinerary: itineraryJson });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});