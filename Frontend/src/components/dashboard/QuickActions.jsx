import React from 'react';
import { Plus, Sparkles, Calendar, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Create New Post',
      description: 'Write a new LinkedIn post',
      icon: Plus,
      color: 'bg-primary-600 hover:bg-primary-700',
      onClick: () => navigate('/calendar?action=create'),
    },
    {
      title: 'Generate with AI',
      description: 'Let AI create content for you',
      icon: Sparkles,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => navigate('/calendar?action=generate'),
    },
    {
      title: 'View Calendar',
      description: 'See your content schedule',
      icon: Calendar,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => navigate('/calendar'),
    },
    {
      title: 'View Analytics',
      description: 'Check your performance',
      icon: BarChart3,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => navigate('/analytics'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="group relative overflow-hidden rounded-xl p-6 text-left text-white transition-all duration-200 hover:scale-105"
        >
          {/* Background */}
          <div className={`absolute inset-0 ${action.color} transition-colors duration-200`} />
          
          {/* Content */}
          <div className="relative z-10">
            <action.icon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold">{action.title}</h3>
            <p className="mt-1 text-sm text-white/80">{action.description}</p>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      ))}
    </div>
  );
};

export default QuickActions;