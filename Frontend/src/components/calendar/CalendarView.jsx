import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import clsx from 'clsx';

const CalendarView = ({ posts = [], selectedDate, onDateSelect, onPostClick }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPostsForDay = (day) => {
    return posts.filter(post => 
      isSameDay(new Date(post.scheduledFor || post.publishedAt), day)
    );
  };

  const goToPrevMonth = () => {
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    onDateSelect(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    onDateSelect(nextMonth);
  };

  return (
    <div className="card p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayPosts = getPostsForDay(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={clsx(
                'min-h-[120px] p-2 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors',
                !isCurrentMonth && 'text-gray-400 bg-gray-50',
                isCurrentDay && 'bg-primary-50 border-primary-200'
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className={clsx(
                'text-sm font-medium mb-2',
                isCurrentDay && 'text-primary-700'
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPostClick(post);
                    }}
                    className={clsx(
                      'text-xs p-1 rounded truncate cursor-pointer',
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    )}
                  >
                    {post.title || post.content?.substring(0, 30) + '...'}
                  </div>
                ))}
                {dayPosts.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayPosts.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;