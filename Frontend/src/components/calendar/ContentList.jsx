import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle, Edit, Trash2, Eye } from 'lucide-react';
import clsx from 'clsx';

const ContentList = ({ posts = [], onPostClick }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return CheckCircle;
      case 'scheduled':
        return Clock;
      default:
        return Edit;
    }
  };

  return (
    <div className="card p-6">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6">
        {[
          { key: 'all', label: 'All Posts' },
          { key: 'draft', label: 'Drafts' },
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'published', label: 'Published' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={clsx(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              filter === tab.key 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No posts found</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const StatusIcon = getStatusIcon(post.status);
            
            return (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => onPostClick(post)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <StatusIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {post.title || 'Untitled Post'}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={clsx('px-2 py-1 text-xs font-medium rounded-full', getStatusColor(post.status))}>
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.status === 'published' 
                            ? format(new Date(post.publishedAt), 'MMM d, yyyy h:mm a')
                            : format(new Date(post.scheduledFor), 'MMM d, yyyy h:mm a')
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.content}
                </p>
                
                {post.status === 'published' && post.engagement && (
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>👀 {post.engagement.impressions || 0}</span>
                    <span>❤️ {post.engagement.likes || 0}</span>
                    <span>💬 {post.engagement.comments || 0}</span>
                    <span>🔄 {post.engagement.shares || 0}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContentList;