# 🌱 EcoPath 3D

EcoPath 3D is a spatial intelligence platform that reimagines urban navigation by prioritizing the **greenest and healthiest route** instead of the fastest one. It helps users choose routes with cleaner air, better shade, and improved walking comfort using real‑time environmental data and AI‑driven explanations.

---

## 🚩 Problem Statement
Urban navigation systems prioritize speed and distance, exposing pedestrians and cyclists to pollution and heat without considering environmental and health impact.

---

## 💡 Solution Overview
EcoPath 3D evaluates multiple walking routes using air quality, shade, and distance to compute a **Green Index**, visually highlights the healthiest route, and explains the recommendation in simple, human‑friendly language.

---

## ✨ Key Features
- Recommends the **greenest route** instead of the fastest  
- Calculates a **Green Index** using air quality, distance, and shade  
- Integrates **real‑time air quality (Universal AQI)** per route  
- Analyzes **shade and heat comfort** using solar data  
- Displays **color‑coded routes** (green, yellow, red) on the map  
- Highlights the **healthiest route in green**  
- Generates **AI‑based explanations** using Gemini  
- Interactive map experience for walking and cycling  
- Supports **sustainable delivery routing** for businesses  

---

## 🛠️ Technologies Used

### Google Technologies
- Google Maps Routes API – fetches multiple walking routes  
- Google Air Quality API – provides real‑time Universal AQI data  
- Google Solar API – estimates shade and heat exposure  
- Google Maps JavaScript API – renders interactive maps  
- Gemini API (Google Generative AI) – generates route explanations  

### Other Technologies
- Node.js + Express.js – backend API and routing logic  
- React.js – frontend user interface  
- Firebase (Hosting & Firestore) – hosting and user data storage  

---

## 🧠 How It Works
1. User enters origin and destination  
2. Backend fetches multiple walking routes  
3. Each route is evaluated using:
   - Air quality (UAQI)
   - Distance
   - Shade / solar comfort  
4. A **Green Index** is computed for every route  
5. Route with the highest Green Index is selected  
6. Gemini generates a simple explanation  
7. Frontend visualizes routes with color‑coding  

---

## 🎨 Route Color Coding
- 🟢 Green – Healthiest route (highest Green Index)  
- 🟡 Yellow – Acceptable alternative  
- 🔴 Red – Least healthy option  

> Routes are recommended and colored **based on Green Index**, not AQI alone.

---

## 🧩 Architecture Overview
- Frontend: React + Google Maps JS API  
- Backend: Node.js + Express.js  
- APIs: Google Routes, Air Quality, Solar, Gemini  
- Storage & Hosting: Firebase  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Google Cloud API keys:
  - Maps
  - Routes
  - Air Quality
  - Solar
  - Gemini

---

### Installation
```bash
git clone https://github.com/your-repo/ecopath-3d.git
cd ecopath-3d
npm install
Environment Variables
Create a .env file:

env
Copy code
GOOGLE_MAPS_API_KEY=your_key_here
MAPS_JS_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
Run the Backend
bash
Copy code
node server.js
Server runs at:

arduino
Copy code
http://localhost:3000
📡 API Endpoint
POST /get-green-route
Request:

json
Copy code
{
  "origin": "Location A",
  "destination": "Location B"
}
Response includes:

Selected green route

Alternative routes

Green Index scores

AI‑generated explanation

🔮 Future Enhancements
Street‑level tree canopy detection using 3D Maps

Personalized routing based on health conditions (asthma, heat sensitivity)

Cycling, delivery, and public‑transport green routing

Noise‑pollution‑aware navigation

City dashboards for urban planners

IoT and wearable device integration

👥 Target Users
Urban pedestrians and cyclists

Environment‑conscious citizens

Small businesses and delivery services

Smart‑city planners

🏁 Conclusion
EcoPath 3D transforms invisible environmental data into actionable insights, enabling healthier and more sustainable urban mobility through explainable AI and real‑time spatial intelligence. 
