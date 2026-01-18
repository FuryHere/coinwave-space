import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

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

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const tierColors: Record<string, string> = {
    S: "from-yellow-400 to-orange-500",
    A: "from-blue-400 to-cyan-500",
    B: "from-green-400 to-emerald-500",
    C: "from-slate-400 to-slate-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {project.avatar_url ? (
                  <img
                    src={project.avatar_url}
                    alt={project.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-700/50 group-hover:ring-cyan-500/50 transition-all duration-300"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl ring-2 ring-slate-700/50 group-hover:ring-cyan-500/50 transition-all duration-300">
                    {project.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-400 capitalize">
                    {project.status}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${
                  tierColors[project.tier] || tierColors.C
                } text-white shadow-lg`}
              >
                {project.tier}
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.chains.slice(0, 3).map((chain) => (
                <span
                  key={chain}
                  className="px-3 py-1 rounded-lg bg-slate-700/50 backdrop-blur-sm text-xs text-slate-300 border border-slate-600/30"
                >
                  {chain}
                </span>
              ))}
              {project.chains.length > 3 && (
                <span className="px-3 py-1 rounded-lg bg-slate-700/50 backdrop-blur-sm text-xs text-slate-400 border border-slate-600/30">
                  +{project.chains.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {project.follower_count} farming
                </span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 font-medium text-sm">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
