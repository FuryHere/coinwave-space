import { useEffect, useState } from "react";
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
  follower_count: number;
  is_featured: boolean;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("tier", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { projects, loading, error, refetch: fetchProjects };
}
