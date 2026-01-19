import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Zap,
  TrendingUp,
  ExternalLink,
  Twitter,
  Globe,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackgroundEffects from "../../components/BackgroundEffects";
import GlassCard from "../../components/ui/GlassCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { Project } from "../../lib/types";

export default function AirdropDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  async function fetchProject() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStartFarming() {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsTracking(true);
    // TODO: Add to user_project_tracking table
    setTimeout(() => setIsTracking(false), 1000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
        <BackgroundEffects />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Airdrop not found
          </h1>
          <button
            onClick={() => router.push("/airdrops")}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to airdrops</span>
          </button>
        </div>
      </div>
    );
  }

  const tierColors: Record<string, string> = {
    S: "from-yellow-400 to-orange-500",
    A: "from-blue-400 to-cyan-500",
    B: "from-green-400 to-emerald-500",
    C: "from-slate-400 to-slate-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <Head>
        <title>{project.name} | CoinWave</title>
      </Head>

      <BackgroundEffects />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/airdrops")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to airdrops</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {project.avatar_url ? (
                      <img
                        src={project.avatar_url}
                        alt={project.name}
                        className="w-20 h-20 rounded-2xl ring-2 ring-slate-700/50"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold ring-2 ring-slate-700/50">
                        {project.name[0]}
                      </div>
                    )}
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">
                        {project.name}
                      </h1>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${tierColors[project.tier]} text-white`}
                        >
                          Tier {project.tier}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm bg-slate-700/50 text-slate-300 capitalize">
                          {project.status}
                        </span>
                        {project.cost && (
                          <span className="px-4 py-1.5 rounded-full text-sm bg-green-500/10 text-green-400 border border-green-500/30">
                            {project.cost}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.chains.map((chain) => (
                    <span
                      key={chain}
                      className="px-4 py-2 rounded-xl bg-slate-700/50 backdrop-blur-sm text-sm text-slate-300 border border-slate-600/30"
                    >
                      {chain}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1">Raised</div>
                    <div className="text-xl font-bold text-green-400">
                      {project.raised_amount || "TBA"}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1">Backers</div>
                    <div className="text-xl font-bold text-white">
                      {project.backers_count || 0}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1">Farming</div>
                    <div className="text-xl font-bold text-cyan-400">
                      {project.follower_count}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-700/30">
                    <div className="text-xs text-slate-400 mb-1">
                      Difficulty
                    </div>
                    <div className="text-xl font-bold text-orange-400">
                      {project.difficulty || "Medium"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">
                      {project.follower_count} people farming
                    </span>
                  </div>
                  <button
                    onClick={handleStartFarming}
                    disabled={isTracking}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Zap className="w-5 h-5" />
                    <span>{isTracking ? "Starting..." : "Start Farming"}</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Tasks Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Tasks</h2>
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📋</div>
                  <p className="text-slate-400">No tasks available yet</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Check back soon for new opportunities
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Total Tasks
                    </span>
                    <span className="text-white font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Completed</span>
                    <span className="text-cyan-400 font-semibold">0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estimated Reward</span>
                    <span className="text-green-400 font-semibold">TBA</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Social Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Website</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Discord</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
