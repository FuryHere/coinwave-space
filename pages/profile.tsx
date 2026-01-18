import Head from "next/head";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Head>
          <title>Profile | CoinWave</title>
        </Head>

        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Profile Settings
            </span>
          </h1>

          <div className="space-y-6">
            {/* Account Info */}
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">
                Account Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Email
                  </label>
                  <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    User ID
                  </label>
                  <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-sm font-mono">
                    {user?.id}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Member Since
                  </label>
                  <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">
                Subscription
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-white mb-1">
                    Free Plan
                  </div>
                  <div className="text-sm text-slate-400">
                    Upgrade to PRO for unlimited tracking
                  </div>
                </div>
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                  Upgrade to PRO
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">
                Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">
                      Email Notifications
                    </div>
                    <div className="text-sm text-slate-400">
                      Receive updates about new projects
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Task Reminders</div>
                    <div className="text-sm text-slate-400">
                      Get reminded about daily tasks
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
