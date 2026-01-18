import Head from "next/head";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      name: "LayerZero",
      description: "Omnichain interoperability protocol",
      tier: "S",
      status: "mainnet",
      chains: ["Ethereum", "Arbitrum", "Optimism"],
      follower_count: 0,
      avatar_url: "https://avatars.githubusercontent.com/u/77795941",
    },
    {
      id: "2",
      name: "zkSync",
      description: "ZK rollup scaling solution",
      tier: "S",
      status: "mainnet",
      chains: ["Ethereum", "zkSync Era"],
      follower_count: 0,
      avatar_url: "https://avatars.githubusercontent.com/u/38040458",
    },
    {
      id: "3",
      name: "Starknet",
      description: "Layer 2 scaling with validity proofs",
      tier: "A",
      status: "mainnet",
      chains: ["Ethereum", "Starknet"],
      follower_count: 0,
      avatar_url: "https://avatars.githubusercontent.com/u/61620936",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>Projects | CoinWave</title>
      </Head>

      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">🌊</div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CoinWave
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="px-4 py-2 text-slate-300 hover:text-white"
              >
                Home
              </Link>
              <Link href="/projects" className="px-4 py-2 text-cyan-400">
                Projects
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Airdrop Projects
            </span>
          </h1>
          <p className="text-xl text-slate-400">Track 3 active opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={project.avatar_url}
                    alt={project.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-400">{project.status}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                  {project.tier}
                </span>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.chains.map((chain) => (
                  <span
                    key={chain}
                    className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300"
                  >
                    {chain}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <span className="text-sm text-slate-400">
                  {project.follower_count} farming
                </span>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all">
                  Start Farming
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
