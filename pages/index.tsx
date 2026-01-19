import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, []);

  async function fetchMarketData() {
    try {
      // Mock data - replace with real API later
      const mockCoins: Coin[] = [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          current_price: 43250.5,
          price_change_percentage_24h: -2.34,
          market_cap: 847000000000,
          total_volume: 28500000000,
          image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          current_price: 2285.75,
          price_change_percentage_24h: 1.52,
          market_cap: 274000000000,
          total_volume: 15200000000,
          image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        },
        {
          id: "solana",
          name: "Solana",
          symbol: "SOL",
          current_price: 98.45,
          price_change_percentage_24h: 5.23,
          market_cap: 42000000000,
          total_volume: 2100000000,
          image: "https://cryptologos.cc/logos/solana-sol-logo.png",
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ADA",
          current_price: 0.52,
          price_change_percentage_24h: -0.85,
          market_cap: 18000000000,
          total_volume: 450000000,
          image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
        },
      ];
      setCoins(mockCoins);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  function formatMarketCap(num: number) {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>CoinWave - Crypto Market & Airdrops</title>
      </Head>

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              <span className="text-xl font-bold text-white">CoinWave</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-cyan-400 font-medium">
                Home
              </Link>
              <Link
                href="/airdrops"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Airdrops
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 px-4 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Cryptocurrency Market Overview
          </h1>
          <p className="text-slate-400 text-lg">
            Track prices, market caps, and discover profitable airdrops
          </p>
        </div>
      </section>

      {/* Market Table */}
      <section className="py-8 px-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-2xl font-bold text-white">Market</h2>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-800/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">
                        Price
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">
                        24h %
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">
                        Market Cap
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">
                        Volume (24h)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {coins.map((coin, index) => (
                      <tr
                        key={coin.id}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-slate-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-8 h-8"
                            />
                            <div>
                              <div className="font-semibold text-white">
                                {coin.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {coin.symbol.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-white">
                          {formatPrice(coin.current_price)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={
                              coin.price_change_percentage_24h >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-300">
                          {formatMarketCap(coin.market_cap)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-300">
                          {formatMarketCap(coin.total_volume)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 mt-20 bg-slate-900/50">
        <div className="max-w-[1600px] mx-auto text-center text-slate-400">
          <p>© 2026 CoinWave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
