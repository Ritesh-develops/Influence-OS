import React from 'react';
import { Eye, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const TopPosts = ({ posts = [] }) => {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary-600">#{index + 1}</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-900 line-clamp-3 mb-3">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Eye className="w-3 h-3" />
                    <span>{post.impressions || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Share2 className="w-3 h-3" />
                    <span>{post.shares || 0}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600">
                  {post.engagementRate}% engagement
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopPosts;