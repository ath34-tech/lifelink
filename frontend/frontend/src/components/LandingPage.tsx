import { motion } from "motion/react";
import { Heart, Activity, Brain, Zap, Shield, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export default function LandingPage({ onGetStarted, onTryDemo }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D1FF] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-[#0077FF]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              LifeLink AI
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-[#00B8D9] transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#00B8D9] transition-colors relative group">
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#team" className="text-gray-700 hover:text-[#00B8D9] transition-colors relative group">
              Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/10 via-[#0077FF]/5 to-[#00D1FF]/10" />
        
        {/* Animated Heartbeat Waveform */}
        <svg className="absolute top-1/3 left-0 w-full h-32 opacity-20" viewBox="0 0 1000 100">
          <motion.path
            d="M0,50 Q50,50 100,50 L150,50 L175,20 L200,80 L225,50 L1000,50"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00B8D9" />
              <stop offset="100%" stopColor="#00D1FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '3.5rem', lineHeight: '1.2' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              LifeLink AI — Your 24×7 AI Health Guardian
            </motion.h1>
            <motion.p
              className="mb-8 text-gray-600"
              style={{ fontSize: '1.25rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Detect. Prevent. Save Lives.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl hover:shadow-lg hover:shadow-[#00B8D9]/50 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
              <button
                onClick={onTryDemo}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#0077FF] rounded-2xl border-2 border-[#00B8D9] hover:bg-[#00B8D9]/10 hover:shadow-lg hover:shadow-[#00B8D9]/30 transition-all duration-300 hover:scale-105"
              >
                Try Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Floating 3D Smartwatch */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-full blur-3xl opacity-30" />
              
              {/* Smartwatch */}
              <div className="relative w-64 h-64 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-4">
                <div className="w-full h-full bg-black rounded-2xl flex flex-col items-center justify-center">
                  {/* Pulsing Heart Rate */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-[#00D1FF] mb-4" fill="#00D1FF" />
                  </motion.div>
                  <div className="text-5xl text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    <motion.span
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      72
                    </motion.span>
                  </div>
                  <div className="text-[#00B8D9]">BPM</div>
                  
                  {/* Mini Heartbeat Line */}
                  <svg className="w-32 h-12 mt-2" viewBox="0 0 100 20">
                    <motion.path
                      d="M0,10 L20,10 L25,5 L30,15 L35,10 L100,10"
                      stroke="#00D1FF"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powered by AI. Built for Life.
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Real-Time Monitoring", desc: "24/7 health tracking with wearable integration" },
              { icon: Brain, title: "Gemini AI Analysis", desc: "Advanced AI detects anomalies instantly" },
              { icon: Zap, title: "Instant Alerts", desc: "Emergency contacts notified in seconds" },
              { icon: Shield, title: "Proactive Protection", desc: "Prevent emergencies before they happen" },
              { icon: Smartphone, title: "Universal Compatibility", desc: "Works with all major wearables" },
              { icon: Heart, title: "Life-Saving Tech", desc: "Every second counts in emergencies" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/20 to-[#00D1FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00B8D9]/50 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built by Visionaries
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { name: "Ath Tripathi" },
              { name: "Adarsh Gupta" },
              { name: "Ayush Pandey" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative">
                  <div className="w-40 h-40 mx-auto bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-36 h-36 bg-white/90 rounded-full flex items-center justify-center text-5xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-center" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{member.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-10 right-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Activity className="w-20 h-20 text-[#00B8D9]" />
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4" style={{ fontSize: '1.125rem' }}>
              LifeLink AI — AI that truly cares.
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-gray-600 hover:text-[#00B8D9] transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#00B8D9] transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#00B8D9] transition-colors relative group">
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#00B8D9] transition-colors relative group">
                Docs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500">
            © 2025 LifeLink AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
