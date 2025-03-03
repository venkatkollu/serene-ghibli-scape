import React, { useState, useEffect } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import { MiniGamesSelector } from '@/components/MiniGames';
import { DockControls, EnvironmentSelector, SettingsMenu } from '@/components/RoomControls';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from '@/components/Calendar';
import { Pomodoro } from '@/components/Pomodoro';
import { Todo } from '@/components/Todo';
import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RelaxationRoom = () => {
  // Use navigation hook
  const navigate = useNavigate();

  // State
  const [showMusic, setShowMusic] = useState(false);
  const [showMiniGames, setShowMiniGames] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [fireplaceActive, setFireplaceActive] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  
  // Full-screen state
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Toggle handlers
  const toggleMusic = () => setShowMusic(!showMusic);
  const toggleMiniGames = () => setShowMiniGames(!showMiniGames);
  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const toggleRain = () => setIsRaining(!isRaining);
  const toggleFireplace = () => setFireplaceActive(!fireplaceActive);
  const togglePomodoro = () => setShowPomodoro(!showPomodoro);
  const toggleTodo = () => setShowTodo(!showTodo);
  const openSettings = () => {
    setShowSettings(true);
  };

  // Home button handler
  const handleHomeClick = () => {
    // Minimize specific components
    setShowCalendar(false);
    setShowPomodoro(false);
    setShowTodo(false);
    
    // Navigate to home using client-side routing
    navigate('/');
  };

  // Full-screen toggle function
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Full-screen change event listener
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);
  
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Environment Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/totoro-forest-rain.mp4"
      />
      
      {/* Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      
      {/* Weather Effects */}
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Rain animation using CSS */}
          <div className="absolute inset-0 bg-repeat-y rain-animation" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='20' viewBox='0 0 4 20'%3E%3Cpath d='M0,0 L1,0 L2,20 L0,20 Z' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E")`,
                 animation: 'rainfall 0.8s linear infinite',
               }} 
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
        </div>
      )}
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col p-4 md:p-10">
        {/* Date and Time Display */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <DateTimeDisplay />
        </div>

        {/* Full Screen Toggle - Desktop Only */}
        <button 
          onClick={toggleFullScreen}
          className="hidden md:block absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
          aria-label={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
        >
          {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>

        {/* Draggable Music Player */}
          <AnimatePresence>
            {showMusic && (
              <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ 
                type: "tween", 
                duration: 0.5,
                ease: "anticipate"
              }}
              style={{ position: 'absolute', top: '1rem', left: '1rem' }}
              className="z-50 w-full max-w-md"
              >
                <MusicPlayer />
              </motion.div>
            )}
          </AnimatePresence>
          
        {/* Draggable Pomodoro */}
        <AnimatePresence>
          {showPomodoro && (
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 z-50 cursor-move w-full"
              style={{ 
                maxWidth: '20rem',
                bottom: '8rem'
              }}
            >
              <Pomodoro />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Draggable Todo */}
        <AnimatePresence>
          {showTodo && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ 
                type: "tween", 
                duration: 0.5,
                ease: "anticipate"
              }}
              style={{ position: 'absolute', top: '1rem', left: '1rem' }}
              className="z-50 w-full max-w-md"
            >
              <Todo />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Interactive Elements Row */}
        <div className="flex-1 flex flex-col gap-4 my-4 md:my-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {/* Left Side Panel - Settings */}
            <div className="order-2 md:order-1">
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <SettingsMenu onClose={() => setShowSettings(false)} className="h-full" />
                </motion.div>
              )}
              
                {!showSettings && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                    className="rounded-xl h-full min-h-[200px] md:min-h-[300px]"
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Center Interactive Area */}
            <div className="order-1 md:order-2">
            <div className="grid grid-cols-1 gap-4">
                {/* Removed InteractiveFireplace */}
            </div>
          </div>
          
            {/* Right Side Panel - Calendar */}
            <div className="order-3">
            <AnimatePresence>
                {showCalendar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                    className="h-full min-h-[200px] md:min-h-[300px]"
                >
                    <Calendar />
                </motion.div>
                )}
                {!showCalendar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                    className="rounded-xl h-full min-h-[200px] md:min-h-[300px]"
                ></motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dock Controls - Fixed for mobile */}
      <DockControls
        onToggleMusic={toggleMusic}
        onToggleMiniGames={toggleMiniGames}
        onToggleFireplace={toggleFireplace}
        onToggleRain={toggleRain}
        onAddPlant={() => {}}
        onOpenSettings={openSettings}
        onToggleCalendar={toggleCalendar}
        onTogglePomodoro={togglePomodoro}
        onToggleTodo={toggleTodo}
        onHomeClick={handleHomeClick}
        environments={[]}
      />
    </div>
  );
};

export default RelaxationRoom;
