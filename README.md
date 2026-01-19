# 🌊 CoinWave

Professional cryptocurrency airdrop tracking platform.

## Features

- 📊 **Market Overview** - Track crypto prices like CryptoRank
- 💧 **Airdrop Tracker** - Monitor 150+ active opportunities
- 🔐 **Authentication** - Secure user accounts with Supabase
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast & Modern** - Built with Next.js 15 + TypeScript

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Pages

- `/` - Home (Market overview table)
- `/airdrops` - Airdrop list (table view)
- `/airdrops/[slug]` - Airdrop detail page
- `/login` - Sign in
- `/register` - Sign up
- `/dashboard` - User dashboard

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

See Supabase SQL Editor for full schema including:
- `projects` - Airdrop projects
- `tasks` - Project tasks
- `user_project_tracking` - User tracking data
- `profiles` - User profiles

## Deployment

Deploy to Vercel:
```bash
git push origin main
```

Vercel will auto-deploy on push.

## License

© 2026 CoinWave. All rights reserved.