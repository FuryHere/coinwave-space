import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/supabase";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🌊</div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CoinWave
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Projects
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
