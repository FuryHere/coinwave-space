import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>404 - Page Not Found | CoinWave</title>
      </Head>

      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="text-8xl mb-4">🌊</div>
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Oops! This wave crashed into nothing.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
