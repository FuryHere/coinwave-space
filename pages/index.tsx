import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundEffects from "../components/BackgroundEffects";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <Head>
        <title>CoinWave - Track Crypto Airdrops</title>
        <meta
          name="description"
          content="Professional airdrop tracking platform"
        />
      </Head>

      <BackgroundEffects />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>Platform used by 10,000+ crypto enthusiasts</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Ride the Crypto Wave</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
            >
              Track airdrops. Farm alpha. Win big. Professional platform with{" "}
              <span className="text-cyan-400 font-semibold">
                AI-powered recommendations
              </span>{" "}
              and{" "}
              <span className="text-blue-400 font-semibold">
                automated task detection
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
              >
                Start Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 text-lg font-semibold hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm"
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  value: "10K+",
                  label: "Active Users",
                  gradient: "from-cyan-400 to-blue-500",
                  delay: 0,
                },
                {
                  value: "150+",
                  label: "Projects",
                  gradient: "from-blue-400 to-purple-500",
                  delay: 0.1,
                },
                {
                  value: "$2.5M+",
                  label: "Earned",
                  gradient: "from-purple-400 to-pink-500",
                  delay: 0.2,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative text-center p-8 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                    <div
                      className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Everything You Need</span>
              </h2>
              <p className="text-xl text-slate-400">
                Powerful features to maximize your airdrop earnings
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Smart Tracking",
                  description:
                    "AI-powered project discovery and automated task detection",
                  gradient: "from-cyan-500/10 to-blue-500/10",
                  border: "border-cyan-500/20",
                  delay: 0,
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Real-time Updates",
                  description:
                    "Never miss an opportunity with instant notifications",
                  gradient: "from-blue-500/10 to-purple-500/10",
                  border: "border-blue-500/20",
                  delay: 0.1,
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Maximize Earnings",
                  description: "ROI calculations and reward predictions",
                  gradient: "from-purple-500/10 to-pink-500/10",
                  border: "border-purple-500/20",
                  delay: 0.2,
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div
                    className={`p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border ${feature.border} hover:border-opacity-50 transition-all duration-300`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
