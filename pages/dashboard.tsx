import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, CheckCircle, Flame, DollarSign, Rocket } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackgroundEffects from '../components/BackgroundEffects'
import ProtectedRoute from '../components/ProtectedRoute'
import GlassCard from '../components/ui/GlassCard'
import AnimatedCard from '../components/ui/AnimatedCard'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!user) return null

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Farming', value: '0', sublabel: 'Active projects', gradient: 'from-cyan-500 to-blue-500' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Completed', value: '0', sublabel: 'Tasks done', gradient: 'from-green-500 to-emerald-500' },
    { icon: <Flame className="w-6 h-6" />, label: 'Streak', value: '0', sublabel: 'Days active', gradient: 'from-orange-500 to-red-500' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Potential', value: '$0', sublabel: 'Estimated value', gradient: 'from-purple-500 to-pink-500' }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
        <Head>
          <title>Dashboard | CoinWave</title>
        </Head>

        <BackgroundEffects />
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-lg">Welcome back, {user.email?.split('@')[0]} 👋</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <GlassCard className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.sublabel}</div>
                </GlassCard>
              </AnimatedCard>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedCard delay={0.4}>
              <GlassCard className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Quick Start</h2>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Start tracking your first project to begin farming airdrops and maximize your earnings
                </p>
                <Link
                  href="/projects"
                  className="inline