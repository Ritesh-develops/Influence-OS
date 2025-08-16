import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

const colorMap = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  red: 'text-red-600 bg-red-50',
  purple: 'text-purple-600 bg-purple-50',
};

const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className={clsx('p-3 rounded-xl', colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-600" />
          )}
          <span className={clsx('ml-1 text-sm font-medium', 
            isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;