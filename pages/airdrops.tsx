import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../lib/supabase";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tier: string;
  status: string;
  chains: string[];
  avatar_url: string;
  raised_amount: string;
  follower_count: number;
  updated_at: string;
}

export default function AirdropsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const statusColors: Record<
    string,
    { bg: string; text: string; dot: string }
  > = {
    farming: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      dot: "bg-green-400",
    },
    testnet: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      dot: "bg-yellow-400",
    },
    mainnet: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
    claiming: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      dot: "bg-cyan-400",
    },
    completed: {
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      dot: "bg-slate-400",
    },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>Airdrops | CoinWave</title>
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
              <Link
                href="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link href="/airdrops" className="text-cyan-400 font-medium">
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

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Airdrop Tracker
          </h1>
          <p className="text-slate-400">
            Track {filteredProjects.length} active opportunities
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search airdrops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[300px] px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="farming">Farming</option>
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
            <option value="claiming">Claiming</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
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
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Chain
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Raised
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Participants
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Updated
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredProjects.map((project) => {
                    const status =
                      statusColors[project.status] || statusColors.mainnet;
                    return (
                      <tr
                        key={project.id}
                        className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.avatar_url ? (
                              <img
                                src={project.avatar_url}
                                alt={project.name}
                                className="w-10 h-10 rounded-lg"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                {project.name[0]}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white">
                                {project.name}
                              </div>
                              <div className="text-xs text-slate-500 max-w-xs truncate">
                                {project.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} border border-${status.text.replace("text-", "")}/30`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}
                            ></span>
                            <span
                              className={`text-xs font-medium uppercase ${status.text}`}
                            >
                              {project.status}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {project.chains.slice(0, 2).map((chain) => (
                              <span
                                key={chain}
                                className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300"
                              >
                                {chain}
                              </span>
                            ))}
                            {project.chains.length > 2 && (
                              <span className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-400">
                                +{project.chains.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-green-400">
                            {project.raised_amount || "TBA"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-300">
                            {project.follower_count.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-400">
                            {getTimeAgo(project.updated_at)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/airdrops/${project.slug}`}>
                            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No airdrops found
                  </h3>
                  <p className="text-slate-400">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
