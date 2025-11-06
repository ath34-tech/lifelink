LifeLink AI — Smart Health Emergency Detection System
=====================================================

LifeLink AI is an intelligent health monitoring platform that connects with wearable devices to detect early signs of medical emergencies — such as cardiac arrest, arrhythmia, fainting, respiratory distress, or sudden accidents — and automatically alerts emergency contacts and services with real-time location and health data.


Problem Statement
-----------------
Every year, millions of people lose their lives due to sudden medical emergencies, road accidents, or unnoticed self-harm attempts — often because help doesn’t reach on time.

While modern wearables continuously record health data (heart rate, SpO₂, motion, stress, etc.), they lack contextual intelligence.
They can measure, but they don’t understand when something’s wrong — and they don’t act when a user is in danger.

There’s a critical gap between data monitoring and life-saving intervention.


Solution Approach
-----------------
LifeLink AI bridges that gap using AI-driven detection, real-time data flow, and automated emergency response.

- Continuously monitors vital signs using wearable devices (Fitbit, Garmin, Google Fit)
- Detects abnormal or risky health patterns through Gemini-powered AI analysis
- Automatically triggers emergency alerts if a user becomes unresponsive
- Sends SMS, voice call, and location to up to 3 emergency contacts using Twilio & FCM
- Streams real-time vitals to user dashboard (mobile/web) via WebSockets
- Logs data to Firebase Firestore for reports and history
- Uses Firebase Authentication to secure user sessions

In short — LifeLink AI acts as a 24×7 personal health guardian.


Technology Stack
----------------
Layer | Technology | Purpose
------|-------------|---------
Frontend (Mobile) | React Native + Firebase Auth | User dashboard, vitals view, SOS alerts
Backend | FastAPI (Python) | REST APIs, WebSocket server
AI Engine | Python (Gemini API + TensorFlow Lite) | Pattern recognition, anomaly detection
Database | Firebase Firestore | Store user info, vitals, history
Cache/Broker | Redis Pub/Sub | Real-time data streaming
Notifications | Twilio API, Firebase Cloud Messaging (FCM) | SMS, calls, and push alerts
Deployment | Google Cloud Run + CI/CD (GitHub Actions) | Scalable, serverless hosting


System Architecture
-------------------
Wearable → FastAPI Backend → Redis → AI Microservice → Redis → WebSocket → Frontend
                             ↓
                       Firebase Auth
                             ↓
                       Firestore + FCM


Setup & Installation
--------------------
1. Clone the repository:
   git clone https://github.com/Life-Link-AI/backend.git
   cd backend

2. Create virtual environment:
   python -m venv venv
   source venv/bin/activate       (Linux/Mac)
   venv\Scripts\activate          (Windows)

3. Install dependencies:
   pip install -r requirements.txt

4. Setup environment variables:
   Create a `.env` file in project root with the following:
     REDIS_URL=redis://localhost:6379/0
     FIREBASE_CREDENTIALS_PATH=firebase-key.json
     TWILIO_SID=<your_twilio_sid>
     TWILIO_TOKEN=<your_twilio_token>
     TWILIO_PHONE=<your_twilio_phone_number>

   Place your Firebase Admin SDK file (firebase-key.json) in project root.

5. Run Redis (for local setup):
   On WSL/Linux:
     sudo service redis-server start
     redis-cli ping   # should return PONG


How to Run the Project
----------------------
Run backend server:
   uvicorn app.main:app --reload
   Server starts at → http://127.0.0.1:8000

Test API:
   curl -X POST http://127.0.0.1:8000/api/v1/health/update \
   -H "Content-Type: application/json" \
   -d '{"user_id":"adarsh","heart_rate":98,"spo2":99,"motion":"still"}'

Expected response:
   {"status": "queued", "user_id": "adarsh"}

Test WebSocket (for live data):
   Connect using:
      ws://127.0.0.1:8000/api/v1/ws/live

   Publish test data to Redis:
      redis-cli publish vitals:analyzed '{"user_id":"adarsh","bpm":120,"spo2":95,"status":"high"}'

You’ll receive the message live in the frontend (or WebSocket tester).


AI Flow (in brief)
------------------
1. Backend publishes incoming wearable data → vitals:raw
2. AI worker (Gemini + TensorFlow) subscribes → analyzes data
3. AI publishes results → vitals:analyzed
4. Backend streams to frontend → triggers alerts if needed
5. FCM/Twilio notify user’s contacts in real time


Team Members
-------------
Name | Role | Responsibilities
------|------|----------------
Ath Tripathi | DevOps & Infrastructure Engineer | Redis, CI/CD, GCP Cloud Run deployment, Twilio notifications, monitoring,  React Native app
Adarsh Gupta | Backend & Frontend Developer | FastAPI backend, WebSocket integration, Firebase integration
Ayush Pandey | AI & Machine Learning Lead | Health anomaly detection, Gemini AI integration, model orchestration



Future Enhancements
-------------------
- Partnerships with insurance & wellness platforms for proactive care.
- Add emotional distress detection (voice/text analysis).
- Expand to IoT-connected fall detection and ECG sensors.
- Enable multilingual voice instructions for first-aid.


Summary
--------
LifeLink AI = "When seconds matter, intelligence saves lives."
It’s not just a health tracker — it’s a lifeline that watches over you.

Built with care during Hackathon 2025 by Team LifeLink AI.
