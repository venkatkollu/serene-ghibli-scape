import React, { useState, useEffect } from 'react';

export const DateTimeDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDay = (date: Date) => 
    date.toLocaleDateString('en-US', { weekday: 'long' });
  
  const formatDate = (date: Date) => 
    date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  
  const formatTime = (date: Date) => 
    date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

  return (
    <div className="bg-transparent backdrop-blur-sm p-4 w-full max-w-xs mx-auto rounded-xl border border-white/20">
      <div className="text-center font-['Quicksand', sans-serif]">
        <div className="text-3xl font-semibold tracking-wide text-white/90">
          {formatTime(currentDateTime)}
        </div>
        <div className="text-lg font-medium text-white/80 mt-1">
          {formatDay(currentDateTime)}
        </div>
        <div className="text-sm text-white/70 mt-1">
          {formatDate(currentDateTime)}
        </div>
      </div>
    </div>
  );
}; 