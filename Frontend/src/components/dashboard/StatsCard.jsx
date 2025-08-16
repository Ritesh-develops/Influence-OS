import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

const colourMap = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  purple: 'text-purple-600 bg-purple-50',
  yellow: 'text-yellow-600 bg-yellow-50',
};

const StatsCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const positive = change >= 0;
  return (
    <div className="card p-5 flex items-center space-x-4">
      <div
        className={clsx(
          'p-3 rounded-xl', 
          colourMap[color] || 'text-blue-600 bg-blue-50'
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>

      <div className="flex items-center">
        {positive ? (
          <ArrowUp className="w-4 h-4 text-green-600" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-600" />
        )}
        <span
          className={clsx(
            'ml-1 text-sm font-medium',
            positive ? 'text-green-600' : 'text-red-600'
          )}
        >
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};

export default StatsCard;