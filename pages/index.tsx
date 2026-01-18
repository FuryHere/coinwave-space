import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>CoinWave - Ride the Crypto Wave</title>
        <meta
          name="description"
          content="Track airdrops. Farm alpha. Win big."
        />
      </Head>

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🌊</div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CoinWave
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            <span className="text-sm font-medium text-cyan-400">
              🌊 Platform used by 10,000+ crypto enthusiasts
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ride the Crypto Wave
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Track airdrops. Farm alpha. Win big. Professional platform with
            AI-powered recommendations and automated task detection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Start Free
            </button>
            <button className="px-8 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-all">
              View Projects →
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
              <div className="text-3xl font-bold text-cyan-400">10K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
              <div className="text-3xl font-bold text-cyan-400">150+</div>
              <div className="text-sm text-slate-400">Projects</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
              <div className="text-3xl font-bold text-cyan-400">$2.5M+</div>
              <div className="text-sm text-slate-400">Earned</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Smart Tracking
              </h3>
              <p className="text-slate-400">
                AI-powered project discovery and automated task detection
              </p>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Real-time Updates
              </h3>
              <p className="text-slate-400">
                Never miss an opportunity with instant notifications
              </p>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Maximize Earnings
              </h3>
              <p className="text-slate-400">
                ROI calculations and reward predictions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
