import React from 'react';
import {
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
} from 'lucide-react';

import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatsCard from '../components/dashboard/StatsCard';
import PostCard from '../components/dashboard/PostCard';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  /* fetch data from the backend */
  const { data: stats, loading: statsLoading } = useApi('/analytics/stats');
  const { data: recent, loading: recentLoading } = useApi('/content/recent?limit=5');
  const { data: scheduled, loading: schedLoading } = useApi('/content/scheduled?limit=5');

  if (statsLoading || recentLoading || schedLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here’s a snapshot of your LinkedIn performance.
        </p>
      </header>

      {/* Quick actions */}
      <QuickActions />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Impressions"
          value={stats?.impressions ?? 0}
          change={stats?.impressionsChange ?? 0}
          icon={TrendingUp}
          color="blue"
        />
        <StatsCard
          title="Profile Views"
          value={stats?.profileViews ?? 0}
          change={stats?.profileViewsChange ?? 0}
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Posts Published"
          value={stats?.postsPublished ?? 0}
          change={stats?.postsChange ?? 0}
          icon={FileText}
          color="purple"
        />
        <StatsCard
          title="Engagement Rate"
          value={stats ? `${stats.engagementRate}%` : '0%'}
          change={stats?.engagementRateChange ?? 0}
          icon={Sparkles}
          color="yellow"
        />
      </section>

      {/* Recent posts */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h2>
        {recent?.length ? (
          <div className="grid gap-4">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} icon={CheckCircle} iconColor="primary" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts published yet.</p>
        )}
      </section>

      {/* Scheduled posts */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Scheduled Posts</h2>
        {scheduled?.length ? (
          <div className="grid gap-4">
            {scheduled.map((post) => (
              <PostCard key={post.id} post={post} icon={Clock} iconColor="orange" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nothing scheduled right now.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;