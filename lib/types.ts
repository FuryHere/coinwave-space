export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tier: "S" | "A" | "B" | "C";
  status: "testnet" | "mainnet" | "completed";
  chains: string[];
  avatar_url: string;
  is_featured: boolean;
  follower_count: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  type: "one_time" | "daily" | "weekly" | "monthly";
  category:
    | "wallet"
    | "social"
    | "transaction"
    | "staking"
    | "quiz"
    | "referral"
    | "other";
  priority: number;
  link_url: string;
  estimated_rewards: number;
  created_at: string;
}

export interface UserProjectTracking {
  id: string;
  user_id: string;
  project_id: string;
  status: "farming" | "interested" | "completed";
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserTaskProgress {
  id: string;
  user_id: string;
  task_id: string;
  completed_at: string;
}
