import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Save, Send, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import apiService from '../../api/apiService';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const PostModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    scheduledFor: '',
    type: 'text',
    hashtags: '',
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        scheduledFor: post.scheduledFor ? format(new Date(post.scheduledFor), "yyyy-MM-dd'T'HH:mm") : '',
        type: post.type || 'text',
        hashtags: post.hashtags?.join(' ') || '',
      });
    }
  }, [post]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        hashtags: formData.hashtags.split(' ').filter(tag => tag.trim()),
      };

      if (post) {
        await apiService.patch(`/content/${post.id}`, payload);
        toast.success('Post updated successfully');
      } else {
        await apiService.post('/content', payload);
        toast.success('Post created successfully');
      }
      
      onSave();
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const generateWithAI = async () => {
    setGenerating(true);
    try {
      const response = await apiService.post('/ai/generate-content', {
        type: formData.type,
        topic: formData.title,
      });
      
      setFormData(prev => ({
        ...prev,
        content: response.data.content,
        hashtags: response.data.hashtags?.join(' ') || '',
      }));
      
      toast.success('Content generated successfully');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter post title..."
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="text">Text Post</option>
              <option value="article">Article</option>
              <option value="carousel">Carousel</option>
              <option value="poll">Poll</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <button
                onClick={generateWithAI}
                disabled={generating}
                className="flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                {generating ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-1" />
                )}
                Generate with AI
              </button>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="What's on your mind?"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length}/3000 characters
            </p>
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags
            </label>
            <input
              type="text"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="#hashtag1 #hashtag2 #hashtag3"
            />
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule for later (Optional)
            </label>
            <input
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !formData.content.trim()}
            className="btn-primary flex items-center"
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {formData.scheduledFor ? 'Schedule Post' : 'Save Draft'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;