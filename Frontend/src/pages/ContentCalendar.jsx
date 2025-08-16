import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar as CalendarIcon, List } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CalendarView from '../components/calendar/CalendarView';
import PostModal from '../components/calendar/PostModal';
import ContentList from '../components/calendar/ContentList';

const ContentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts, loading, refetch } = useApi('/content/all');

  const handleCreatePost = () => {
    setSelectedPost(null);
    setShowPostModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
    refetch();
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const filteredPosts = posts?.filter(post => 
    post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
        <p className="text-gray-600 mt-2">Plan and schedule your LinkedIn content</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CalendarIcon className="w-4 h-4 inline mr-1" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4 inline mr-1" />
                List
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm
                  focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-secondary text-sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            <button onClick={handleCreatePost} className="btn-primary text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Content View */}
      {viewMode === 'calendar' ? (
        <CalendarView 
          posts={filteredPosts}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onPostClick={handleEditPost}
        />
      ) : (
        <ContentList 
          posts={filteredPosts}
          onPostClick={handleEditPost}
        />
      )}

      {/* Post Modal */}
      {showPostModal && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
          onSave={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ContentCalendar;