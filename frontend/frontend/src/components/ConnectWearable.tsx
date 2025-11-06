import { motion } from "motion/react";
import { Watch, Check, Loader } from "lucide-react";
import { useState } from "react";

interface ConnectWearableProps {
  onConnect: () => void;
}

export default function ConnectWearable({ onConnect }: ConnectWearableProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);

  const handleConnect = (device: string) => {
    setConnecting(device);
    setTimeout(() => {
      setConnecting(null);
      setConnected(device);
      setTimeout(() => {
        onConnect();
      }, 1000);
    }, 2000);
  };

  const devices = [
    {
      name: "Google Fit",
      icon: "🏃",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Fitbit",
      icon: "⌚",
      color: "from-teal-500 to-cyan-600",
    },
    {
      name: "Garmin",
      icon: "🔵",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20" />
      
      {/* Rotating Holographic Band Outline */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-96 h-96 border-4 border-dashed border-[#00B8D9] rounded-full" />
        <div className="absolute w-72 h-72 border-4 border-dashed border-[#00D1FF] rounded-full" />
      </motion.div>

      <div className="relative max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}
          >
            Connect Your Wearable
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Choose your device to start monitoring your health
          </p>
        </motion.div>

        {/* Device Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {devices.map((device, idx) => (
            <motion.div
              key={device.name}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              {/* Glow Effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${device.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                animate={connecting === device.name ? { opacity: [0.3, 0.7, 0.3] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-[#00B8D9]/50 transition-all duration-300 hover:scale-105">
                {/* Device Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${device.color} rounded-2xl flex items-center justify-center text-5xl shadow-lg`}>
                    {device.icon}
                  </div>
                </div>

                <h3
                  className="text-center mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}
                >
                  {device.name}
                </h3>

                {/* Connect Button */}
                <button
                  onClick={() => handleConnect(device.name)}
                  disabled={connecting !== null || connected !== null}
                  className={`w-full py-3 rounded-2xl transition-all duration-300 ${
                    connected === device.name
                      ? 'bg-green-500 text-white'
                      : connecting === device.name
                      ? 'bg-gray-400 text-white cursor-wait'
                      : 'bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white hover:shadow-lg hover:shadow-[#00B8D9]/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {connected === device.name ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                        <span>Connected</span>
                      </>
                    ) : connecting === device.name ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader className="w-5 h-5" />
                        </motion.div>
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <span>Connect</span>
                    )}
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Mode Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={onConnect}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#0077FF] rounded-2xl border-2 border-[#00B8D9] hover:bg-[#00B8D9]/10 hover:shadow-lg hover:shadow-[#00B8D9]/30 transition-all duration-300 hover:scale-105"
          >
            Use Demo Mode
          </button>
          <p className="mt-4 text-gray-500">
            Try LifeLink AI with simulated data
          </p>
        </motion.div>
      </div>
    </div>
  );
}
