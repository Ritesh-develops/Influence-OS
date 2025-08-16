import React from 'react';
import { Calendar, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

const PostCard = ({ post, icon: Icon, iconColor = 'primary' }) => {
  const iconColors = {
    primary: 'text-primary-600 bg-primary-50',
    orange: 'text-orange-600 bg-orange-50',
    green: 'text-green-600 bg-green-50',
  };

  return (
    <div className="card p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Status Icon */}
        <div className={clsx('p-2 rounded-lg', iconColors[iconColor])}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                {post.title || 'Untitled Post'}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {post.content}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(post.publishedAt || post.scheduledFor), 'MMM d, yyyy')}</span>
            </div>
            {post.type && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {post.type}
              </span>
            )}
          </div>

          {/* Engagement Stats (for published posts) */}
          {post.engagement && (
            <div className="mt-3 flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Eye className="w-3 h-3" />
                <span>{post.engagement.impressions || 0}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Heart className="w-3 h-3" />
                <span>{post.engagement.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <MessageCircle className="w-3 h-3" />
                <span>{post.engagement.comments || 0}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Share2 className="w-3 h-3" />
                <span>{post.engagement.shares || 0}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {post.status === 'draft' && (
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;