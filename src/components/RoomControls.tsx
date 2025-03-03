import React, { useState } from 'react';
import { Dock, DockIcon, DockItem, DockLabel } from './ui/dock';
import { 
  Home,
  TreeDeciduous,
  X,
  Music, 
  Calendar as CalendarIcon,
  ListTodo
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

type DockControlsProps = {
  onToggleMusic: () => void;
  onToggleMiniGames: () => void;
  onToggleFireplace: () => void;
  onToggleRain: () => void;
  onAddPlant: () => void;
  onOpenSettings: () => void;
  onToggleCalendar: () => void;
  onTogglePomodoro?: () => void;
  onToggleTodo?: () => void;
  onHomeClick?: () => void;
  environments: { id: string; name: string; thumbnail: string }[];
};

export const DockControls: React.FC<DockControlsProps> = ({
  onToggleMusic,
  onToggleMiniGames,
  onToggleFireplace,
  onToggleRain,
  onAddPlant,
  onOpenSettings,
  onToggleCalendar,
  onTogglePomodoro,
  onToggleTodo,
  onHomeClick,
  environments
}) => {
  const [showEnvironments, setShowEnvironments] = useState(false);

  const defaultEnvironments = [
    {
      id: 'cottage',
      name: 'Country Cottage',
      thumbnail: 'https://i.pinimg.com/736x/34/a9/19/34a919d3743bacea70c6e1bc97855216.jpg',
    },
    {
      id: 'meadow',
      name: 'Ghibli Meadow',
      thumbnail: 'https://i.pinimg.com/736x/3b/52/5b/3b525b51ce6d6b91a555a80fcf41597d.jpg',
    },
    {
      id: 'sky',
      name: 'Ghibli Sky',
      thumbnail: 'https://i.pinimg.com/736x/23/21/e4/2321e4e92a8ed0eff10dc176cbb2ec49.jpg',
    },
    {
      id: 'sunny',
      name: 'Ghibli Sunny',
      thumbnail: 'https://i.pinimg.com/736x/c5/21/81/c52181f5212108d03720d77bdc81955a.jpg',
    }
  ];

  const environmentsToShow = environments.length > 0 ? environments : defaultEnvironments;

  const dockItems = [
    { 
      title: 'Home', 
      icon: <Home className="h-full w-full" />, 
      action: onHomeClick || (() => window.location.href = '/') 
    },
    {
      title: 'Music',
      icon: <Music className="h-full w-full" />,
      action: onToggleMusic
    },
    {
      title: 'Calendar',
      icon: <CalendarIcon className="h-full w-full" />,
      action: onToggleCalendar
    },
    {
      title: 'Todo',
      icon: <ListTodo className="h-full w-full" />,
      action: onToggleTodo
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <Dock className="items-end pb-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl max-w-screen-sm mx-auto">
        {dockItems.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full bg-white/30 hover:bg-white/40 active:bg-white/50 transition-colors"
            onClick={item.action}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
};

type EnvironmentSelectorProps = {
  onSelect: (environment: string) => void;
  environments: { id: string; name: string; thumbnail: string }[];
  className?: string;
};

export const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({ 
  onSelect, 
  environments,
  className
}) => {
  return (
    <div className={`glass-panel p-4 ${className}`}>
      <h3 className="text-sm font-medium mb-3">Change Environment</h3>
      <div className="grid grid-cols-2 gap-3">
        {environments.map((env) => (
          <button
            key={env.id}
            className="overflow-hidden rounded-lg border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => onSelect(env.id)}
          >
            <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${env.thumbnail})` }}></div>
            <div className="p-2 text-xs text-center">{env.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

type SettingsMenuProps = {
  onClose: () => void;
  className?: string;
};

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose, className }) => {
  const [volume, setVolume] = useState(70);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className={`glass-panel p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Settings</h3>
        <button 
          onClick={onClose}
          className="text-xs hover:underline"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs mb-2 block">Main Volume: {volume}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full h-2 appearance-none bg-white/30 rounded-full outline-none"
          />
        </div>
        
        <div>
          <label className="text-xs mb-2 block">Animation Speed: {animationSpeed}%</label>
          <input 
            type="range" 
            min="50" 
            max="150" 
            value={animationSpeed} 
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            className="w-full h-2 appearance-none bg-white/30 rounded-full outline-none"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="notifications" className="text-xs">Enable Notifications</label>
        </div>
        
        <div className="pt-4 border-t border-white/20">
          <button 
            className="w-full glass-button text-xs"
            onClick={onClose}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
