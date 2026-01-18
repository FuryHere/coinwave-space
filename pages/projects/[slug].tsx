import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/Navbar";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tier: string;
  status: string;
  chains: string[];
  avatar_url: string;
  follower_count: number;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project not found
          </h1>
          <button
            onClick={() => router.push("/projects")}
            className="text-cyan-400 hover:text-cyan-300"
          >
            ← Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Head>
        <title>{project.name} | CoinWave</title>
      </Head>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => router.push("/projects")}
          className="text-slate-400 hover:text-white mb-6 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to projects</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {project.avatar_url ? (
                    <img
                      src={project.avatar_url}
                      alt={project.name}
                      className="w-20 h-20 rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {project.name[0]}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {project.name}
                    </h1>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                        Tier {project.tier}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-slate-700 text-slate-300">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-lg mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.chains.map((chain) => (
                  <span
                    key={chain}
                    className="px-3 py-1 rounded-lg bg-slate-700/50 text-sm text-slate-300"
                  >
                    {chain}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                <span className="text-slate-400">
                  {project.follower_count} people farming
                </span>
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                  Start Farming
                </button>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Tasks</h2>
              <div className="text-center py-12 text-slate-400">
                No tasks available yet
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Tasks</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completed</span>
                  <span className="text-cyan-400 font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Reward</span>
                  <span className="text-green-400 font-semibold">TBA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
