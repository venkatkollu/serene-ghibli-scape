import React, { useState, useRef, useEffect } from 'react';
import { Flame, Droplets, Sun, Cloud, Leaf, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PlantProps = {
  image: string;
  name: string;
  className?: string;
};

export const InteractivePlant: React.FC<PlantProps> = ({ image, name, className }) => {
  const [isGrowing, setIsGrowing] = useState(false);
  const [growthStage, setGrowthStage] = useState(1);
  
  const waterPlant = () => {
    if (growthStage < 3) {
      setIsGrowing(true);
      setTimeout(() => {
        setGrowthStage(prev => Math.min(prev + 1, 3));
        setIsGrowing(false);
      }, 1500);
    }
  };
  
  return (
    <div className={`plant relative w-full aspect-square sm:aspect-[3/4] ${className}`}>
      <motion.div 
        className={`relative transition-all duration-500 ease-out h-full ${isGrowing ? 'filter brightness-110' : ''}`}
        animate={{ 
          scale: isGrowing ? 1.05 : 1,
          y: growthStage === 1 ? '20%' : growthStage === 2 ? '10%' : '0%'
        }}
      >
        <img 
          src={image} 
          alt={name} 
          className="object-contain h-full w-full max-h-[250px] sm:max-h-[300px] mx-auto"
        />
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white/90 text-sm sm:text-base text-center font-medium">{name}</p>
      </div>
      
      <button 
        onClick={waterPlant}
        disabled={growthStage >= 3 || isGrowing}
        className="absolute bottom-4 right-4 p-3 sm:p-4 rounded-full bg-white/30 backdrop-blur-sm 
                   opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50
                   hover:bg-white/40 active:scale-95 transform"
        aria-label="Water plant"
      >
        <Droplets size={20} className="text-white" />
      </button>
    </div>
  );
};

type FireplaceProps = {
  className?: string;
};

export const InteractiveFireplace: React.FC<FireplaceProps> = ({ className }) => {
  return null;
};

export const FloatingLeaves: React.FC = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.div 
          key={i}
          className="leaf absolute"
          initial={{ 
            x: `${Math.random() * 100}%`,
            y: -20,
            rotate: Math.random() * 360 
          }}
          animate={{ 
            y: '120vh',
            x: `${Math.random() * 100}%`,
            rotate: Math.random() * 720 - 360
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <Leaf 
            size={Math.random() * 8 + 12} 
            className="text-ghibli-grass/60" 
          />
        </motion.div>
      ))}
    </>
  );
};

export const FloatingClouds: React.FC = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <motion.div 
          key={i}
          className="cloud absolute"
          initial={{ 
            x: -100,
            y: `${Math.random() * 30 + 10}%`
          }}
          animate={{ 
            x: '120vw',
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        >
          <Cloud 
            size={Math.random() * 30 + 40} 
            className="text-white/20" 
          />
        </motion.div>
      ))}
    </>
  );
};
