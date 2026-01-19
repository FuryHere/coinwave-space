import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: string[];
    tier: string[];
    cost: string[];
  };
  activeFilters: {
    status: string[];
    tier: string[];
    cost: string[];
  };
  onFilterChange: (category: "status" | "tier" | "cost", value: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: FilterSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 z-50 overflow-y-auto lg:static lg:w-64"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Filters</h3>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Clear All */}
              {(activeFilters.status.length > 0 ||
                activeFilters.tier.length > 0 ||
                activeFilters.cost.length > 0) && (
                <button
                  onClick={onClearAll}
                  className="w-full mb-6 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-sm text-slate-400 hover:text-white transition-all"
                >
                  Clear All Filters
                </button>
              )}

              {/* Status Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                  Status
                </h4>
                <div className="space-y-2">
                  {filters.status.map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.status.includes(status)}
                        onChange={() => onFilterChange("status", status)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-300 capitalize">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tier Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                  Tier
                </h4>
                <div className="space-y-2">
                  {filters.tier.map((tier) => (
                    <label
                      key={tier}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.tier.includes(tier)}
                        onChange={() => onFilterChange("tier", tier)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-300">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cost Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                  Cost
                </h4>
                <div className="space-y-2">
                  {filters.cost.map((cost) => (
                    <label
                      key={cost}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.cost.includes(cost)}
                        onChange={() => onFilterChange("cost", cost)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-300">{cost}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
