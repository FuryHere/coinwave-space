import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function useTracking() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function startTracking(projectId: string) {
    if (!user) return { error: "Not authenticated" };

    setLoading(true);
    try {
      const { error } = await supabase.from("user_project_tracking").insert({
        user_id: user.id,
        project_id: projectId,
        status: "farming",
      });

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function stopTracking(projectId: string) {
    if (!user) return { error: "Not authenticated" };

    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_project_tracking")
        .delete()
        .eq("user_id", user.id)
        .eq("project_id", projectId);

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  }

  async function getTrackedProjects() {
    if (!user) return { data: [], error: "Not authenticated" };

    try {
      const { data, error } = await supabase
        .from("user_project_tracking")
        .select(
          `
          *,
          projects (*)
        `,
        )
        .eq("user_id", user.id);

      if (error) throw error;
      return { data: data || [] };
    } catch (err: any) {
      return { data: [], error: err.message };
    }
  }

  return { startTracking, stopTracking, getTrackedProjects, loading };
}
