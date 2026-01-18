interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 ${
        hover ? "hover:border-cyan-500/50 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
