import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Head>
          <title>Dashboard | CoinWave</title>
        </Head>

        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-400">Welcome back, {user.email}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Farming</div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-xs text-slate-500 mt-1">Active projects</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Completed</div>
              <div className="text-3xl font-bold text-cyan-400">0</div>
              <div className="text-xs text-slate-500 mt-1">Tasks done</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Streak</div>
              <div className="text-3xl font-bold text-purple-400">0</div>
              <div className="text-xs text-slate-500 mt-1">Days active</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Potential</div>
              <div className="text-3xl font-bold text-green-400">$0</div>
              <div className="text-xs text-slate-500 mt-1">Estimated value</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">
                Quick Start
              </h2>
              <p className="text-slate-400 mb-6">
                Start tracking your first project to begin farming airdrops
              </p>
              <Link
                href="/projects"
                className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Browse Projects
              </Link>
            </div>

            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">
                Recent Activity
              </h2>
              <div className="text-slate-400 text-center py-8">
                No activity yet. Start farming!
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
