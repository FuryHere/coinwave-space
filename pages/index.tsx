import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  // Temporary redirect to airdrops page
  useEffect(() => {
    router.push("/airdrops");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <Head>
        <title>CoinWave - Track Crypto Airdrops</title>
      </Head>
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
    </div>
  );
};

export default Home;
