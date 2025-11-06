import { motion } from "motion/react";
import {
  Heart,
  Activity,
  Wind,
  Footprints,
  Brain,
  UserPlus,
  FileText,
  Settings,
  LogOut,
  AlertTriangle,
  Phone,
  Edit,
} from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardProps {
  onEmergency: () => void;
  onReports: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export default function Dashboard({ onEmergency, onReports, onSettings, onLogout }: DashboardProps) {
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [steps, setSteps] = useState(8453);
  const [stress, setStress] = useState(32);
  const [geminiMessage, setGeminiMessage] = useState("");
  const [showGeminiMessage, setShowGeminiMessage] = useState(false);

  const fullMessage = "All vitals normal 👍";

  useEffect(() => {
    // Simulate live health data updates
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + Math.floor(Math.random() * 3 - 1));
      setSpo2((prev) => Math.min(100, Math.max(95, prev + Math.floor(Math.random() * 2 - 1))));
      setSteps((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Typewriter effect for Gemini message
    setShowGeminiMessage(true);
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullMessage.length) {
        setGeminiMessage(fullMessage.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  const contacts = [
    { name: "Emergency Services", phone: "911" },
    { name: "Ath tripathi", phone: "+91 9532862543" },
    { name: "Pushkar nath tripathi", phone: "+91 9839413190" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className="w-64 min-h-screen bg-white/60 backdrop-blur-2xl border-r border-white/20 p-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-[#0077FF]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              LifeLink AI
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { icon: Activity, label: "Dashboard", active: true },
              // { icon: AlertTriangle, label: "Alerts", active: false },
              { icon: FileText, label: "Reports", active: false, onClick: onReports },
              { icon: Settings, label: "Settings", active: false, onClick: onSettings },
              { icon: LogOut, label: "Logout", active: false, onClick: onLogout },
            ].map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? 'bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Top Navbar */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Health Dashboard
              </h1>
              <p className="text-gray-600">Real-time monitoring powered by Gemini AI</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-700">Connected ✅</span>
            </div>
          </motion.div>

          {/* Live Health Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Heart Rate */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Activity className="w-6 h-6 text-red-500" />
                  </motion.div>
                </div>
                <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  {heartRate}
                </div>
                <div className="text-gray-600">Heart Rate (BPM)</div>
              </div>
            </motion.div>

            {/* SpO2 Level */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        fill="none"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#00B8D9"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 126" }}
                        animate={{ strokeDasharray: `${(spo2 / 100) * 126} 126` }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  {spo2}%
                </div>
                <div className="text-gray-600">Oxygen Level</div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Footprints className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Footprints className="w-6 h-6 text-green-500" />
                  </motion.div>
                </div>
                <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  {steps.toLocaleString()}
                </div>
                <div className="text-gray-600">Steps Today</div>
              </div>
            </motion.div>

            {/* Stress Level */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  {stress}%
                </div>
                <div className="text-gray-600">Stress Level</div>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${stress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gemini AI Assistant Panel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-3xl blur opacity-30" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      Gemini AI Assistant
                    </h3>
                    <p className="text-gray-600">Real-time health analysis</p>
                  </div>
                </div>

                {showGeminiMessage && (
                  <motion.div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <p className="text-gray-700">{geminiMessage}</p>
                  </motion.div>
                )}

                <button
                  onClick={onEmergency}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  Simulate Emergency
                </button>
              </div>
            </motion.div>

            {/* Emergency Contacts Panel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-20" />
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    Emergency Contacts
                  </h3>
                  <button className="p-2 hover:bg-white/50 rounded-xl transition-colors">
                    <UserPlus className="w-5 h-5 text-[#00B8D9]" />
                  </button>
                </div>

                <div className="space-y-3">
                  {contacts.map((contact, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-colors group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                            {contact.name}
                          </div>
                          <div className="text-gray-500">{contact.phone}</div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
