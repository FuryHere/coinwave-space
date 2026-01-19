import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/supabase";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>Dashboard | CoinWave</title>
      </Head>

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              <span className="text-xl font-bold text-white">CoinWave</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-slate-300 hover:text-white">
                Home
              </Link>
              <Link
                href="/airdrops"
                className="text-slate-300 hover:text-white"
              >
                Airdrops
              </Link>
              <Link href="/dashboard" className="text-cyan-400">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-slate-700 hover:border-slate-600 text-white rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-8">Welcome back, {user.email}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
            <div className="text-sm text-slate-400 mb-1">Farming</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-xs text-slate-500 mt-1">Active projects</div>
          </div>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
            <div className="text-sm text-slate-400 mb-1">Completed</div>
            <div className="text-3xl font-bold text-cyan-400">0</div>
            <div className="text-xs text-slate-500 mt-1">Tasks done</div>
          </div>
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
            <div className="text-sm text-slate-400 mb-1">Potential</div>
            <div className="text-3xl font-bold text-green-400">$0</div>
            <div className="text-xs text-slate-500 mt-1">Estimated value</div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Start Farming</h2>
          <p className="text-slate-400 mb-6">
            Browse airdrops and start tracking projects to maximize your
            earnings
          </p>
          <Link
            href="/airdrops"
            className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
          >
            Browse Airdrops
          </Link>
        </div>
      </div>
    </div>
  );
}
