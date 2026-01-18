import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>CoinWave - Track Crypto Airdrops</title>
        <meta
          name="description"
          content="Professional airdrop tracking platform"
        />
      </Head>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-cyan-500/30 text-cyan-400 text-sm">
                🌊 Platform used by 10,000+ crypto enthusiasts
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ride the Crypto Wave
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Track airdrops. Farm alpha. Win big. Professional platform with
              AI-powered recommendations and automated task detection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all"
              >
                Start Free
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 rounded-lg border border-slate-700 text-slate-300 text-lg font-semibold hover:bg-slate-800 transition-all"
              >
                View Projects →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-slate-400">Active Users</div>
              </div>
              <div className="text-center p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <div className="text-slate-400">Projects</div>
              </div>
              <div className="text-center p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  $2.5M+
                </div>
                <div className="text-slate-400">Earned</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Smart Tracking
                </h3>
                <p className="text-slate-400">
                  AI-powered project discovery and automated task detection
                </p>
              </div>
              <div className="p-8 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Real-time Updates
                </h3>
                <p className="text-slate-400">
                  Never miss an opportunity with instant notifications
                </p>
              </div>
              <div className="p-8 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/50 transition-all">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Maximize Earnings
                </h3>
                <p className="text-slate-400">
                  ROI calculations and reward predictions
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer /> {/* ← DODAJ TO */}
    </div>
  );
};

export default Home;
