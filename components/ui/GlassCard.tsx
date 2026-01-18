import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-slate-800/40 to-slate-900/40
        backdrop-blur-xl
        border border-slate-700/50
        rounded-2xl
        shadow-2xl shadow-black/20
        ${hover ? "hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {/* Glass shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
