import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Music2, Timer, Home, Menu } from 'lucide-react';
import { Pomodoro } from './Pomodoro';

type NavItem = 'home' | 'calendar' | 'music' | 'pomodoro' | 'menu';

export const BottomNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavItem>('home');
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [currentTime, setCurrentTime] = useState('25:00');

  const navItems = [
    { id: 'home' as NavItem, icon: Home, label: 'Home' },
    { id: 'calendar' as NavItem, icon: Calendar, label: 'Calendar' },
    { id: 'music' as NavItem, icon: Music2, label: 'Music' },
    { id: 'pomodoro' as NavItem, icon: Timer, label: 'Pomodoro' },
    { id: 'menu' as NavItem, icon: Menu, label: 'Menu' }
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item);
    if (item === 'pomodoro') {
      setShowPomodoro(!showPomodoro);
    } else {
      setShowPomodoro(false);
    }
  };

  const handleTimeUpdate = (time: string) => {
    setCurrentTime(time);
  };

  return (
    <>
      <AnimatePresence>
        {showPomodoro && <Pomodoro onTimeUpdate={handleTimeUpdate} />}
      </AnimatePresence>

      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <nav className="max-w-xl mx-auto px-4 py-2">
          <ul className="flex items-center justify-between">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? 'text-ghibli-accent'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    <item.icon size={24} />
                    {activeItem === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-ghibli-accent rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  <span className="text-xs mt-1">
                    {item.id === 'pomodoro' && !showPomodoro ? currentTime : item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mini Timer Display when Pomodoro is active but hidden */}
        {!showPomodoro && activeItem === 'pomodoro' && (
          <motion.div 
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-ghibli-accent px-4 py-2 rounded-t-xl shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-white text-sm font-medium">{currentTime}</span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}; 