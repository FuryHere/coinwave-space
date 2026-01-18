import Link from "next/link";

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
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const tierColors: Record<string, string> = {
    S: "from-yellow-400 to-orange-500",
    A: "from-blue-400 to-cyan-500",
    B: "from-green-400 to-emerald-500",
    C: "from-slate-400 to-slate-500",
  };

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {project.avatar_url ? (
              <img
                src={project.avatar_url}
                alt={project.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {project.name[0]}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-slate-400 capitalize">
                {project.status}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${
              tierColors[project.tier] || tierColors.C
            } text-white`}
          >
            {project.tier}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.chains.slice(0, 3).map((chain) => (
            <span
              key={chain}
              className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300"
            >
              {chain}
            </span>
          ))}
          {project.chains.length > 3 && (
            <span className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-400">
              +{project.chains.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <span className="text-sm text-slate-400">
            {project.follower_count} farming
          </span>
          <span className="text-sm text-cyan-400 group-hover:text-cyan-300 font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
