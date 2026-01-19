import Link from "next/link";
import Head from "next/head";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>404 - Page Not Found | CoinWave</title>
      </Head>

      {/* Simple Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <span className="text-xl font-bold text-white">CoinWave</span>
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🌊</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">
          Oops! This wave crashed into nothing.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
