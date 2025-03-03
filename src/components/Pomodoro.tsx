import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Brain, GripHorizontal } from 'lucide-react';

type TimerMode = 'focus' | 'break';

export const Pomodoro: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [cycles, setCycles] = useState(0);
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    // Set drag constraints based on window size
    const updateConstraints = () => {
      setDragConstraints({
        top: -window.innerHeight + 200, // Allow dragging up to top of screen
        left: -window.innerWidth + 200,  // Allow dragging to left edge
        right: window.innerWidth - 200,  // Allow dragging to right edge
        bottom: 0                        // Don't allow dragging below starting position
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    const notification = new Audio('/notification.mp3');
    notification.play();
    
    if (mode === 'focus') {
      setCycles(prev => prev + 1);
      setMode('break');
      setTimeLeft(5 * 60); // 5 minute break
    } else {
      setMode('focus');
      setTimeLeft(25 * 60);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      dragMomentum={false}
    >
      <div className="flex flex-col items-center">
        {/* Drag Handle */}
        <div className="w-full flex justify-center mb-2 cursor-grab active:cursor-grabbing">
          <GripHorizontal className="w-6 h-6 text-white/50" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => {
              setMode('focus');
              setTimeLeft(25 * 60);
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              mode === 'focus' 
                ? 'bg-ghibli-accent text-white' 
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            <Brain size={18} />
            <span>Focus</span>
          </button>
          <button
            onClick={() => {
              setMode('break');
              setTimeLeft(5 * 60);
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              mode === 'break' 
                ? 'bg-ghibli-accent text-white' 
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            <Coffee size={18} />
            <span>Break</span>
          </button>
        </div>

        <div className="text-4xl font-bold text-white mb-6">
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <RotateCcw size={24} />
          </motion.button>
        </div>

        <div className="mt-4 text-sm text-white/80">
          Completed cycles: {cycles}
        </div>
      </div>
    </motion.div>
  );
};