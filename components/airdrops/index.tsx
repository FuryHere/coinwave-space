import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Head from "next/head";
import { motion } from "framer-motion";
import { Search, Filter as FilterIcon, SlidersHorizontal } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AirdropTableRow from "../../components/airdrops/AirdropTableRow";
import FilterSidebar from "../../components/airdrops/FilterSidebar";
import BackgroundEffects from "../../components/BackgroundEffects";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { Project } from "../../lib/types";

export default function AirdropsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    tier: string[];
    cost: string[];
  }>({
    status: [],
    tier: [],
    cost: [],
  });

  const filters = {
    status: ["farming", "claiming", "testnet", "mainnet", "completed"],
    tier: ["S", "A", "B", "C"],
    cost: ["Free", "Paid"],
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, searchTerm, activeFilters]);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("admin_updated_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = [...projects];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter((p) =>
        activeFilters.status.includes(p.status),
      );
    }

    // Tier filter
    if (activeFilters.tier.length > 0) {
      filtered = filtered.filter((p) => activeFilters.tier.includes(p.tier));
    }

    // Cost filter
    if (activeFilters.cost.length > 0) {
      filtered = filtered.filter((p) =>
        activeFilters.cost.includes(p.cost || "Free"),
      );
    }

    setFilteredProjects(filtered);
  }

  function handleFilterChange(
    category: "status" | "tier" | "cost",
    value: string,
  ) {
    setActiveFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  }

  function clearAllFilters() {
    setActiveFilters({ status: [], tier: [], cost: [] });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <Head>
        <title>Airdrops | CoinWave</title>
      </Head>

      <BackgroundEffects />
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
              />
            </div>
          </div>

          {/* Sidebar - Mobile */}
          <FilterSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Airdrop Tracker</span>
              </h1>
              <p className="text-slate-400 text-lg">
                Tracking {filteredProjects.length} active opportunities
              </p>
            </motion.div>

            {/* Search & Filters Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search airdrops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white hover:border-cyan-500/50 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </motion.div>

            {/* Table */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/50 bg-slate-800/50">
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Project
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Status
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Tier
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Chains
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Raised
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Difficulty
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Updated
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-400 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project, index) => (
                        <AirdropTableRow
                          key={project.id}
                          project={project}
                          index={index}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      No airdrops found
                    </h3>
                    <p className="text-slate-400">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
