import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/supabase";
import { LogOut, User, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const isActive = (path: string) =>
    router.pathname === path || router.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-2xl"
    >
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              🌊
            </div>
            <span className="text-xl font-bold gradient-text">CoinWave</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/") && router.pathname === "/"
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/airdrops"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                isActive("/airdrops") || isActive("/projects")
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Airdrops</span>
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive("/dashboard")
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
