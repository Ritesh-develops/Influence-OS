import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Calendar,
  Download
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MetricCard from '../components/analytics/MetricCard';
import EngagementChart from '../components/analytics/EngagementChart';
import TopPosts from '../components/analytics/TopPosts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const { data: analytics, loading } = useApi(`/analytics/overview?range=${dateRange}`);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const metrics = [
    {
      title: 'Total Impressions',
      value: analytics?.totalImpressions || 0,
      change: analytics?.impressionsChange || 0,
      icon: Eye,
      color: 'blue',
    },
    {
      title: 'Profile Views',
      value: analytics?.profileViews || 0,
      change: analytics?.profileViewsChange || 0,
      icon: Users,
      color: 'green',
    },
    {
      title: 'Total Engagements',
      value: analytics?.totalEngagements || 0,
      change: analytics?.engagementsChange || 0,
      icon: Heart,
      color: 'red',
    },
    {
      title: 'Avg. Engagement Rate',
      value: `${analytics?.avgEngagementRate || 0}%`,
      change: analytics?.engagementRateChange || 0,
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Track your LinkedIn performance and growth</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="btn-secondary text-sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Impressions Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Impressions Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics?.impressionsData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Types Chart */}
        <EngagementChart data={analytics?.engagementData || []} />
      </div>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Posts */}
        <div className="lg:col-span-2">
          <TopPosts posts={analytics?.topPosts || []} />
        </div>

        {/* Post Type Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics?.postTypeData || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {(analytics?.postTypeData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {(analytics?.postTypeData || []).map((type, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4] }}
                  />
                  <span className="text-gray-600">{type.name}</span>
                </div>
                <span className="font-medium text-gray-900">{type.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;