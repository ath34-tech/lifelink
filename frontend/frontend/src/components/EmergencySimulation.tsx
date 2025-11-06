import { motion } from "motion/react";
import { AlertTriangle, MapPin, Phone, MessageSquare, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface EmergencySimulationProps {
  onReturn: () => void;
}

export default function EmergencySimulation({ onReturn }: EmergencySimulationProps) {
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [geminiMessage, setGeminiMessage] = useState("");

  const initialMessage = "Detected critical heart rate — Are you okay?";

  useEffect(() => {
    // Typewriter effect for initial Gemini message
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= initialMessage.length) {
        setGeminiMessage(initialMessage.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (step === 1) {
      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep(2);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 2000);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Red Warning Light Effect */}
      <motion.div
        className="absolute inset-0 bg-red-500"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          {/* Step 0 & 1: Initial Detection */}
          {step <= 1 && (
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Pulsing Glow */}
              <motion.div
                className="absolute -inset-4 bg-red-500 rounded-full blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                {/* Alert Icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                {/* Gemini Message */}
                <motion.div
                  className="bg-red-50 rounded-2xl p-6 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                        Gemini AI
                      </div>
                      <p className="text-gray-700 text-lg">{geminiMessage}</p>
                    </div>
                  </div>
                </motion.div>

                {step === 1 && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Countdown Ring */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#fee2e2"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#ef4444"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "352 352" }}
                          animate={{ strokeDasharray: `${(countdown / 5) * 352} 352` }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                      <div
                        className="absolute text-5xl text-red-500"
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                      >
                        {countdown}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">Waiting for response...</p>
                    <button
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-white border-2 border-gray-300 rounded-2xl hover:border-[#00B8D9] transition-all"
                    >
                      I'm OK
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Sending Alerts */}
          {step === 2 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onAnimationComplete={() => setTimeout(() => setStep(3), 2000)}
            >
              {/* Pulsing Signal Animation */}
              <div className="flex justify-center mb-8">
                <motion.div className="relative">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-32 h-32 border-4 border-red-500 rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2 + i, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* SMS Alert Card */}
              <motion.div
                className="bg-white rounded-3xl p-6 shadow-2xl"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      Sending SMS Alert
                    </div>
                    <p className="text-gray-600">Notifying emergency contacts...</p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-6 h-6 border-3 border-[#00B8D9] border-t-transparent rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Voice Assistant Animation */}
              <motion.div
                className="bg-white rounded-3xl p-6 shadow-2xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      Voice Assistant
                    </div>
                    <p className="text-gray-600">Preparing to call for help...</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-8 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full"
                        animate={{ height: [8, 32, 8] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Map and Final Message */}
          {step === 3 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Map Card */}
              <motion.div
                className="bg-white rounded-3xl overflow-hidden shadow-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-4 h-4 bg-red-500 rounded-full"
                          style={{
                            top: `${Math.random() * 200}px`,
                            left: `${Math.random() * 300}px`,
                          }}
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className="w-16 h-16 text-red-500" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-[#00B8D9]" />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      Location Shared
                    </span>
                  </div>
                  <p className="text-gray-600">123 Main St, San Francisco, CA 94102</p>
                </div>
              </motion.div>

              {/* Final Gemini Message */}
              <motion.div
                className="bg-white rounded-3xl p-6 shadow-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      Gemini AI
                    </div>
                    <p className="text-gray-700 text-lg">Help has been notified 🚑</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4 mb-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Emergency services contacted
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      3 emergency contacts notified via SMS
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Location shared with responders
                    </li>
                  </ul>
                </div>

                <button
                  onClick={onReturn}
                  className="w-full py-3 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl hover:shadow-lg hover:shadow-[#00B8D9]/50 transition-all"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: User is OK */}
          {step === 4 && (
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}>
                Glad you're safe!
              </h2>
              <p className="text-gray-600 mb-6">
                Emergency alert cancelled. Continue monitoring your health.
              </p>
              <button
                onClick={onReturn}
                className="px-8 py-3 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl hover:shadow-lg hover:shadow-[#00B8D9]/50 transition-all"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
