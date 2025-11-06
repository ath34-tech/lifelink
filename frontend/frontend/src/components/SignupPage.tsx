import { motion } from "motion/react";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useState } from "react";

interface SignupPageProps {
  onSignupSuccess: (token: string) => void;
  onNavigateLogin: () => void;
}

export default function SignupPage({ onSignupSuccess, onNavigateLogin }: SignupPageProps) {
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Sign up
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          full_name: fullName,
          email,
          phone,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Signup failed");
      }

      // Step 2: Auto-login after successful signup
      const loginRes = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: userId, password }).toString(),
      });

      if (!loginRes.ok) {
        throw new Error("Signup successful, but login failed. Please login manually.");
      }

      const loginData = await loginRes.json();
      
      // Store token and user info
      localStorage.setItem("access_token", loginData.access_token);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("full_name", fullName);
      localStorage.setItem("email", email);
      
      onSignupSuccess(loginData.access_token);
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20" />

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
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
        />
      ))}

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-3xl blur-lg opacity-50" />
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <motion.h1
            className="text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0077FF] to-[#00D1FF]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create Your Account
          </motion.h1>

          <motion.p
            className="text-center text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sign up to start using LifeLink AI
          </motion.p>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">User ID</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                  placeholder="unique_user_id"
                  required
                  disabled={loading}
                  minLength={3}
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">Phone</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                  placeholder="+91 9876543210"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">Password</label>
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
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium text-sm">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-[#00B8D9] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/20 transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                {loading ? "Creating Account..." : "Sign Up"}
              </span>
            </motion.button>

            <motion.p
              className="text-center mt-4 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Already have an account?{" "}
              <button 
                type="button"
                className="text-[#00B8D9] hover:underline font-semibold" 
                onClick={onNavigateLogin}
                disabled={loading}
              >
                Login
              </button>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
