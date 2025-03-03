'use client'
import { useState, useEffect } from 'react'
import { CirclePlay, CirclePause, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MiniPlayerProps {
  title: string;
  artist: string;
  poster: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

export function MiniPlayer({ 
  title, 
  artist, 
  poster, 
  isPlaying, 
  onPlayPause, 
  onClose 
}: MiniPlayerProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 
        bg-white/10 backdrop-blur-lg border border-white/20 
        rounded-full shadow-lg px-4 py-2 w-[90%] max-w-[400px]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{title}</h4>
          <p className="text-xs text-white/70 truncate">{artist}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onPlayPause}
            className="text-white hover:text-white/80 transition-colors"
          >
            {isPlaying ? 
              <CirclePause className="w-8 h-8" /> : 
              <CirclePlay className="w-8 h-8" />
            }
          </button>
          
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
} 