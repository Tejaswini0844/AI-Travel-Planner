# 🇮🇳 India Travel Planner

An AI-powered trip planning web app that generates complete, day-by-day travel itineraries for any city in India — built with a real user in mind, not just a wrapper around an AI prompt.

Tell it your city, number of days, and budget per day, and it builds a full itinerary: morning/afternoon/evening activities, local food recommendations, and a detailed cost breakdown for every day.

## ✨ Features

- **AI-generated itineraries** — powered by Google's Gemini API, structured as day-by-day plans with local, non-touristy recommendations
- **Budget tracking** — per-day cost breakdown (stay, transport, food, activities) shown alongside each day's plan
- **User accounts (optional)** — sign up / sign in with email & password via Firebase Authentication; guests can still generate itineraries without an account
- **Save trips** — logged-in users can save itineraries to revisit later via a "My Trips" dashboard
- **PDF export** — download any day's itinerary as a PDF
- **Custom design system** — warm, India-inspired visual identity (mandala motifs, maroon & cream palette, Playfair Display typography) built entirely in CSS/SVG
- **Multi-page flow** — Landing → Plan Form → Day-by-day Itinerary, with React Router

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router (multi-page navigation)
- Firebase Authentication + Firestore (user accounts & saved trips)
- jsPDF + html2canvas (PDF export)

**Backend**
- Node.js + Express
- Google Gemini API (AI itinerary generation)
- dotenv (environment variable management)
- CORS

## 📁 Project Structure

```
ai-travel-planner/
├── backend/
│   ├── server.js          # Express server + Gemini API integration
│   ├── .env                # API keys (not committed)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── PlanForm.jsx
│   │   │   ├── Itinerary.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── MyTrips.jsx
│   │   ├── components/
│   │   │   └── AuthWidget.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── assets/          # Background images, illustrations
│   │   ├── firebase.js      # Firebase config & initialization
│   │   └── App.jsx          # Route definitions
│   └── package.json
└── README.md
```

## 🗺️ How It Works

1. User enters their city, number of days, and budget per day
2. The frontend sends this to the Express backend
3. The backend builds a structured prompt and calls the Gemini API, requesting a JSON-formatted itinerary
4. The response is parsed and sent back to the frontend, where it's rendered as day-by-day cards
5. Users can page through each day, download a PDF, and (if logged in) save the trip to their account

## 🔮 Future Improvements

- Trip summary page comparing total budget vs. actual planned spend across all days
- Conversational chatbot interface as an alternative to the form
- Multi-city / multi-leg trip support
- Shareable trip links
- Offline access to saved trips

## 📄 License & Credits

Background illustrations used under free license from Vecteezy.

Built as a personal project to explore full-stack development with AI integration.
