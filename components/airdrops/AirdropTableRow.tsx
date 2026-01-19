import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../lib/types";

interface AirdropTableRowProps {
  project: Project;
  index: number;
}

export default function AirdropTableRow({
  project,
  index,
}: AirdropTableRowProps) {
  const tierColors: Record<string, string> = {
    S: "bg-gradient-to-r from-yellow-400 to-orange-500",
    A: "bg-gradient-to-r from-blue-400 to-cyan-500",
    B: "bg-gradient-to-r from-green-400 to-emerald-500",
    C: "bg-gradient-to-r from-slate-400 to-slate-500",
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
    claiming: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      dot: "bg-cyan-400",
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
    completed: {
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      dot: "bg-slate-400",
    },
  };

  const status = statusColors[project.status] || statusColors.mainnet;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer"
    >
      <td className="py-4 px-6">
        <Link
          href={`/airdrops/${project.slug}`}
          className="flex items-center gap-3"
        >
          {project.avatar_url ? (
            <img
              src={project.avatar_url}
              alt={project.name}
              className="w-10 h-10 rounded-lg ring-1 ring-slate-700/50 group-hover:ring-cyan-500/50 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {project.name[0]}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
              {project.name}
            </div>
            <div className="text-xs text-slate-500 truncate max-w-xs">
              {project.description}
            </div>
          </div>
        </Link>
      </td>

      <td className="py-4 px-6">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg} backdrop-blur-sm`}
        >
          <div
            className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}
          ></div>
          <span className={`text-xs font-medium uppercase ${status.text}`}>
            {project.status}
          </span>
        </div>
      </td>

      <td className="py-4 px-6">
        <span
          className={`inline-block px-3 py-1.5 rounded-full text-sm font-bold ${tierColors[project.tier]} text-white shadow-lg`}
        >
          {project.tier}
        </span>
      </td>

      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-1.5">
          {project.chains.slice(0, 2).map((chain) => (
            <span
              key={chain}
              className="px-2 py-1 rounded-md bg-slate-700/50 text-xs text-slate-300 border border-slate-600/30"
            >
              {chain}
            </span>
          ))}
          {project.chains.length > 2 && (
            <span className="px-2 py-1 rounded-md bg-slate-700/50 text-xs text-slate-400 border border-slate-600/30">
              +{project.chains.length - 2}
            </span>
          )}
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="text-sm font-semibold text-green-400">
          {project.raised_amount || "TBA"}
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                style={{
                  width: `${project.difficulty === "Easy" ? 33 : project.difficulty === "Medium" ? 66 : 100}%`,
                }}
              ></div>
            </div>
          </div>
          <span className="text-xs text-slate-400 min-w-[3rem]">
            {project.difficulty || "Medium"}
          </span>
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="text-sm text-slate-400">
          {getTimeAgo(project.admin_updated_at || project.updated_at)}
        </div>
      </td>

      <td className="py-4 px-6">
        <Link
          href={`/airdrops/${project.slug}`}
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span className="text-sm font-medium">View</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </td>
    </motion.tr>
  );
}
