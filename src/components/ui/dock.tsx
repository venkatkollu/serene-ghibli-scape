'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from 'lucide-react';
import { Pomodoro } from '../Pomodoro';
import { cn } from '@/lib/utils';

interface DockProps {
  children?: React.ReactNode;
  className?: string;
}

export function Dock({ children, className }: DockProps) {
  const [showPomodoro, setShowPomodoro] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showPomodoro && <Pomodoro />}
      </AnimatePresence>

      <div
        className={cn(
          "flex w-fit gap-4 px-4 dark:bg-neutral-900 items-end pb-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl max-w-screen-sm mx-auto",
          className
        )}
        role="toolbar"
        aria-label="Application dock"
        style={{ height: '64px' }}
      >
        {children}
        
        <button
          onClick={() => setShowPomodoro(!showPomodoro)}
          className="relative inline-flex items-center justify-center aspect-square rounded-full bg-white/30 hover:bg-white/40 active:bg-white/50 transition-colors"
          style={{ width: '40px' }}
        >
          <div className="flex items-center justify-center" style={{ width: '20px' }}>
            <Timer className="h-full w-full" />
          </div>
        </button>
      </div>
    </>
  );
}

interface DockItemProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DockItem({ children, className, onClick }: DockItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center aspect-square rounded-full bg-white/30 hover:bg-white/40 active:bg-white/50 transition-colors",
        className
      )}
      style={{ width: '40px' }}
    >
      {children}
    </button>
  );
}

interface DockIconProps {
  children?: React.ReactNode;
  className?: string;
}

export function DockIcon({ children, className }: DockIconProps) {
  return (
    <div 
      className={cn("flex items-center justify-center", className)} 
      style={{ width: '20px' }}
    >
      {children}
    </div>
  );
}

interface DockLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export function DockLabel({ children, className }: DockLabelProps) {
  return (
    <motion.div
      className={cn(
        "absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
