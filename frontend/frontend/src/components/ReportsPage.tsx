import { motion } from "motion/react";
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface ReportsPageProps {
  onBack: () => void;
}

export default function ReportsPage({ onBack }: ReportsPageProps) {
  const reports = [
    {
      week: "Oct 28 – Nov 3, 2025",
      summary: "Heart rate spikes detected twice during rest periods. Consider reducing caffeine intake.",
      trend: "up",
      insights: [
        "Average heart rate: 74 BPM",
        "2 anomalies detected",
        "Sleep quality: Good",
      ],
    },
    {
      week: "Oct 21 – Oct 27, 2025",
      summary: "Consistent improvement in step count and oxygen levels. Keep up the great work!",
      trend: "up",
      insights: [
        "Average heart rate: 71 BPM",
        "Daily steps increased by 12%",
        "SpO2 levels: Excellent",
      ],
    },
    {
      week: "Oct 14 – Oct 20, 2025",
      summary: "Stress levels elevated during midweek. Detected correlation with reduced sleep.",
      trend: "down",
      insights: [
        "Average stress: 45%",
        "Sleep duration: 5.5 hours",
        "Recommendation: More rest needed",
      ],
    },
    {
      week: "Oct 7 – Oct 13, 2025",
      summary: "All vitals within normal range. No anomalies detected this week.",
      trend: "neutral",
      insights: [
        "Average heart rate: 69 BPM",
        "Consistent activity levels",
        "Excellent health markers",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onBack}
            className="p-3 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/80 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-[#0077FF]" />
          </button>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' }}>
              Health Reports
            </h1>
            <p className="text-gray-600">Gemini-generated weekly health summaries</p>
          </div>
        </motion.div>

        {/* Reports Timeline */}
        <div className="space-y-6">
          {reports.map((report, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Gemini Icon */}
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-[#00B8D9] to-[#00D1FF] rounded-xl flex items-center justify-center relative"
                      whileHover={{ rotate: 5 }}
                    >
                      <Brain className="w-7 h-7 text-white" />
                      {/* Tooltip on hover */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Activity className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                    
                    <div>
                      <div className="text-gray-500 mb-1">{report.week}</div>
                      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                        Weekly Analysis
                      </h3>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  {report.trend === "up" && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Improving</span>
                    </div>
                  )}
                  {report.trend === "down" && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-xl">
                      <TrendingDown className="w-5 h-5 text-orange-600" />
                      <span className="text-orange-600">Needs Attention</span>
                    </div>
                  )}
                  {report.trend === "neutral" && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600">Stable</span>
                    </div>
                  )}
                </div>

                {/* Gemini Summary */}
                <motion.div
                  className="bg-gradient-to-r from-[#00B8D9]/10 to-[#00D1FF]/10 rounded-2xl p-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00B8D9] rounded-full mt-2" />
                    <p className="text-gray-700 flex-1">{report.summary}</p>
                  </div>
                </motion.div>

                {/* Key Insights */}
                <div className="grid md:grid-cols-3 gap-4">
                  {report.insights.map((insight, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/50 rounded-xl p-4 border border-white/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 + i * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#00B8D9] to-[#00D1FF] rounded-full" />
                        <p className="text-gray-600">{insight}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Tooltip */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none"
                  initial={{ y: -10 }}
                  whileHover={{ y: 0 }}
                >
                  Gemini AI Analysis
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-[#00B8D9]/20 to-[#00D1FF]/20 rounded-3xl p-8 backdrop-blur-xl border border-white/20">
            <Brain className="w-12 h-12 text-[#00B8D9] mx-auto mb-4" />
            <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem' }}>
              Powered by Gemini AI
            </h3>
            <p className="text-gray-600 mb-6">
              Advanced AI analyzes your health patterns to provide personalized insights and early warnings.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-[#0077FF] to-[#00D1FF] text-white rounded-2xl hover:shadow-lg hover:shadow-[#00B8D9]/50 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
