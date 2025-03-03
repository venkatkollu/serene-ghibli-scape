
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { toast } from 'sonner';

// Soot Sprites Game
export const SootSpritesGame: React.FC = () => {
  const [sprites, setSprites] = useState<{id: number, x: number, y: number, cleaned: boolean}[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  
  const generateSprites = () => {
    const newSprites = [];
    for (let i = 0; i < 8; i++) {
      newSprites.push({
        id: i,
        x: Math.random() * 80 + 10, // percentage
        y: Math.random() * 80 + 10, // percentage
        cleaned: false
      });
    }
    setSprites(newSprites);
    setScore(0);
    setGameActive(true);
  };
  
  const cleanSprite = (id: number) => {
    setSprites(prev => 
      prev.map(sprite => 
        sprite.id === id ? { ...sprite, cleaned: true } : sprite
      )
    );
    setScore(prev => prev + 1);
    
    if (score + 1 >= sprites.length) {
      toast("All sprites cleaned! Great job!");
      setGameActive(false);
    }
  };
  
  return (
    <div className="glass-panel p-4 h-full w-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-sm font-medium">Clean the Soot Sprites</h3>
        <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Score: {score}
        </div>
      </div>
      
      {!gameActive ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-center mb-4">
            Help clean up the soot sprites! Click on them to sweep them away.
          </p>
          <button
            onClick={generateSprites}
            className="glass-button"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="relative flex-1 bg-black/20 rounded-lg">
          {sprites.map(sprite => (
            !sprite.cleaned && (
              <motion.div
                key={sprite.id}
                className="absolute w-8 h-8 soot-sprite"
                style={{ left: `${sprite.x}%`, top: `${sprite.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => cleanSprite(sprite.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="black" />
                  <circle cx="8" cy="9" r="1.5" fill="white" />
                  <circle cx="16" cy="9" r="1.5" fill="white" />
                </svg>
              </motion.div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

// Totoro Plushies Game
export const TotoroPlushiesGame: React.FC = () => {
  const [plushies, setPlushies] = useState<{id: number, rotation: number, position: number, color: string}[]>([]);
  const [selectedPlushie, setSelectedPlushie] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const colors = ['#9ACD32', '#87CEEB', '#FFD700', '#8B4513', '#F5F5F5'];
  
  const generatePlushies = () => {
    const newPlushies = [];
    for (let i = 0; i < 5; i++) {
      newPlushies.push({
        id: i,
        rotation: Math.random() * 360,
        position: Math.floor(Math.random() * 5),
        color: colors[i % colors.length],
      });
    }
    setPlushies(newPlushies);
    setSelectedPlushie(null);
    setComplete(false);
    setGameActive(true);
  };
  
  const selectPlushie = (id: number) => {
    setSelectedPlushie(id);
  };
  
  const movePlushie = (position: number) => {
    if (selectedPlushie === null) return;
    
    let newPlushies = [...plushies];
    
    // Check if position is already occupied
    const existingPlushie = newPlushies.findIndex(p => p.position === position && p.id !== selectedPlushie);
    if (existingPlushie !== -1) {
      // Swap positions
      const selectedPosition = newPlushies.find(p => p.id === selectedPlushie)?.position || 0;
      newPlushies[existingPlushie].position = selectedPosition;
    }
    
    // Update selected plushie position
    newPlushies = newPlushies.map(p => 
      p.id === selectedPlushie ? { ...p, position, rotation: 0 } : p
    );
    
    setPlushies(newPlushies);
    setSelectedPlushie(null);
    
    // Check if all plushies are in correct position (position matches id)
    const isComplete = newPlushies.every(p => p.position === p.id);
    if (isComplete) {
      setComplete(true);
      toast("Perfect arrangement! They look so happy!");
    }
  };
  
  return (
    <div className="glass-panel p-4 h-full w-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-sm font-medium">Arrange Totoro Plushies</h3>
        {complete && (
          <div className="text-xs bg-ghibli-sunbeam/30 px-2 py-1 rounded-full">
            Complete!
          </div>
        )}
      </div>
      
      {!gameActive ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-center mb-4">
            Arrange the Totoro plushies in a nice row. Click one to select, then click a position to place it.
          </p>
          <button
            onClick={generatePlushies}
            className="glass-button"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-white/10 rounded-lg mb-4">
            {plushies.map(plushie => (
              <motion.div
                key={plushie.id}
                className={`absolute w-12 h-12 cursor-pointer ${selectedPlushie === plushie.id ? 'ring-2 ring-white' : ''}`}
                style={{ 
                  left: `${(plushie.position * 20) + 10}%`, 
                  top: '50%',
                  y: '-50%',
                  rotate: plushie.rotation,
                  backgroundColor: plushie.color,
                  borderRadius: '50%'
                }}
                whileHover={{ scale: 1.1 }}
                animate={{ rotate: selectedPlushie === plushie.id ? 0 : plushie.rotation }}
                onClick={() => selectPlushie(plushie.id)}
              >
                <div className="relative w-full h-full">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/90 rounded-full">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-white/70 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between h-12 bg-white/10 rounded-lg p-2">
            {[0, 1, 2, 3, 4].map(position => (
              <motion.div
                key={position}
                className="h-full aspect-square bg-white/20 rounded-md cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => movePlushie(position)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mini Game Selector
type MiniGamesSelectorProps = {
  className?: string;
};

export const MiniGamesSelector: React.FC<MiniGamesSelectorProps> = ({ className }) => {
  const [activeGame, setActiveGame] = useState<'soot' | 'totoro' | null>(null);
  
  return (
    <div className={`glass-panel p-4 flex flex-col h-full ${className}`}>
      <h3 className="text-sm font-medium mb-4">Mini Games</h3>
      
      {!activeGame ? (
        <div className="flex-1 grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveGame('soot')}
            className="glass-button flex flex-col items-center justify-center p-4 h-full"
          >
            <div className="w-8 h-8 mb-2">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="black" />
                <circle cx="8" cy="9" r="1.5" fill="white" />
                <circle cx="16" cy="9" r="1.5" fill="white" />
              </svg>
            </div>
            <span>Clean Soot Sprites</span>
          </button>
          
          <button
            onClick={() => setActiveGame('totoro')}
            className="glass-button flex flex-col items-center justify-center p-4 h-full"
          >
            <div className="w-8 h-8 mb-2" style={{ backgroundColor: '#9ACD32', borderRadius: '50%' }}>
              <div className="relative w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/90 rounded-full">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            <span>Arrange Plushies</span>
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <button
            onClick={() => setActiveGame(null)}
            className="self-start mb-4 text-xs underline"
          >
            ← Back to Games
          </button>
          
          <div className="flex-1">
            {activeGame === 'soot' ? <SootSpritesGame /> : <TotoroPlushiesGame />}
          </div>
        </div>
      )}
    </div>
  );
};
