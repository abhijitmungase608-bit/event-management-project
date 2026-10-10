import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card rounded-2xl p-5 animate-pulse space-y-4">
          <div className="bg-slate-800 h-48 rounded-xl w-full"></div>
          <div className="h-6 bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3"></div>
          <div className="h-10 bg-slate-800 rounded-xl w-full pt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
