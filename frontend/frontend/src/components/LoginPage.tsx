import { motion } from "motion/react";
import { Mail, Lock, Heart } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (token: string) => void;
  onNavigateSignup: () => void;
}

export default function LoginPage({ onLogin, onNavigateSignup }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ 
          username: email, 
          password: password 
        }).toString(),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }

      const data = await res.json();
      // Store token in localStorage for persistence
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", email);
      
      onLogin(data.access_token);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20" />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00D1FF] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, Math.random() * 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glowing Border Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-3xl blur-lg opacity-50" />
        
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <motion.h1
            className="text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to LifeLink AI
          </motion.h1>
          
          <motion.p
            className="text-center text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your safety companion powered by Gemini.
          </motion.p>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/User ID Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block mb-2 text-gray-700 font-medium">Email / User ID</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                    placeholder="user_id or email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block mb-2 text-gray-700 font-medium">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                {loading ? "Logging in..." : "Login"}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white/70 text-gray-500">or</span>
              </div>
            </div>

            {/* Google Login (Optional - implement later) */}
            <motion.button
              type="button"
              className="relative w-full py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl border-2 border-gray-200 hover:border-[#00B8D9] transition-all duration-300 flex items-center justify-center gap-3 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Login with Google
              </span>
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.p
            className="text-center mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Don't have an account?{" "}
            <button 
              type="button"
              onClick={onNavigateSignup}
              className="text-[#00B8D9] hover:underline font-semibold"
            >
              Sign up
            </button>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
