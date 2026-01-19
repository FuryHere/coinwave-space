import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/supabase";

export default function ProfilePage() {
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
        <title>Profile | CoinWave</title>
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
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white"
              >
                Dashboard
              </Link>
              <Link href="/profile" className="text-cyan-400">
                Profile
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Email
              </label>
              <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                User ID
              </label>
              <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-sm font-mono">
                {user.id}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <button
                onClick={handleSignOut}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
