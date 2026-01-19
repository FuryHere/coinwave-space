import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProjectRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/airdrops/${slug}`);
    }
  }, [slug, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
    </div>
  );
}
