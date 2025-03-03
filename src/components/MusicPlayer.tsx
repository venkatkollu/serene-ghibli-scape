import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, SkipForward, SkipBack, Youtube, Heart, Repeat, Shuffle, Maximize2, Minimize2, X, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from './ui/slider';
import { MiniPlayer } from './ui/mini-player';

type Track = {
  title: string;
  artist: string;
  src: string;
  category: 'music' | 'ambient';
  youtubeId?: string;
  artwork?: string;
};

// Sample track data with artwork
const musicTracks: Track[] = [
  {
    title: 'Studio Ghibli Playlist',
    artist: 'Joe Hisaishi',
    src: '',
    category: 'music',
    youtubeId: 'TK1Ij_-mank',
    artwork: 'https://i.pinimg.com/736x/34/a9/19/34a919d3743bacea70c6e1bc97855216.jpg',
  },
  {
    title: 'Ghibli Jazz Cafe',
    artist: 'Studio Ghibli Jazz',
    src: '',
    category: 'music',
    youtubeId: 'Sh_lcL-_qtg',
    artwork: 'https://i.pinimg.com/736x/3b/52/5b/3b525b51ce6d6b91a555a80fcf41597d.jpg',
  },
  {
    title: 'Ghibli Piano Collection',
    artist: 'Studio Ghibli Piano',
    src: '',
    category: 'music',
    youtubeId: 'zhDwjnYZiCo',
    artwork: 'https://i.pinimg.com/736x/23/21/e4/2321e4e92a8ed0eff10dc176cbb2ec49.jpg',
  },
  {
    title: 'Peaceful Melody',
    artist: 'Joe Hisaishi Style',
    src: 'https://soundbible.com/mp3/meadowlark_daniel-simion.mp3',
    category: 'music',
    artwork: 'https://i.pinimg.com/736x/3b/52/5b/3b525b51ce6d6b91a555a80fcf41597d.jpg',
  },
  {
    title: 'Spirited Journey',
    artist: 'Joe Hisaishi Style',
    src: 'https://soundbible.com/mp3/robin_song-Mike_Koenig-1093738462.mp3',
    category: 'music',
    artwork: 'https://i.pinimg.com/736x/23/21/e4/2321e4e92a8ed0eff10dc176cbb2ec49.jpg',
  },
];

const ambientTracks: Track[] = [
  {
    title: 'Gentle Rain',
    artist: 'Nature Sounds',
    src: 'https://soundbible.com/mp3/light-rain-ambient-114430.mp3',
    category: 'ambient',
    artwork: 'https://i.pinimg.com/736x/c5/21/81/c52181f5212108d03720d77bdc81955a.jpg',
  },
  {
    title: 'Forest Breeze',
    artist: 'Nature Sounds',
    src: 'https://soundbible.com/mp3/meadowlark_daniel-simion.mp3',
    category: 'ambient',
    artwork: 'https://i.pinimg.com/736x/3b/52/5b/3b525b51ce6d6b91a555a80fcf41597d.jpg',
  },
];

type MusicPlayerProps = {
  className?: string;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(musicTracks[0]);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAmbient, setShowAmbient] = useState(false);
  const [showYouTube, setShowYouTube] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [visualizerValues, setVisualizerValues] = useState<number[]>(Array(50).fill(0));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubeRef = useRef<HTMLIFrameElement>(null);
  const animationRef = useRef<number>();
  
  // Setup audio visualization
  useEffect(() => {
    if (!showYouTube && audioRef.current) {
      const intervalId = setInterval(() => {
        if (isPlaying) {
          // Generate random visualization data when audio is playing
          setVisualizerValues(Array(50).fill(0).map(() => 
            Math.floor(Math.random() * 50) + (isPlaying ? 10 : 0)
          ));
        } else {
          // Lower visualization when paused
          setVisualizerValues(prev => prev.map(v => Math.max(0, v * 0.7)));
        }
      }, 100);
      
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, showYouTube]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedData = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      nextTrack();
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (!showYouTube && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, showYouTube]);
  
  // Add new effect to handle YouTube player state changes
  useEffect(() => {
    if (showYouTube && youtubeRef.current) {
      // Initialize YouTube player with current state
      const message = isPlaying
        ? '{"event":"command","func":"playVideo","args":""}'
        : '{"event":"command","func":"pauseVideo","args":""}';
      
      try {
        youtubeRef.current.contentWindow?.postMessage(message, '*');
      } catch (e) {
        console.error("YouTube control failed:", e);
      }
    }
  }, [showYouTube, isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    // Control YouTube playback if YouTube is active
    if (showYouTube && youtubeRef.current && youtubeRef.current.contentWindow) {
      try {
        if (isPlaying) {
          youtubeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
          youtubeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      } catch (e) {
        console.error("YouTube control failed:", e);
      }
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Control YouTube volume if YouTube is active
    if (showYouTube && youtubeRef.current && youtubeRef.current.contentWindow) {
      try {
        youtubeRef.current.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${Math.floor(newVolume * 100)}]}`, '*');
      } catch (e) {
        console.error("YouTube volume control failed:", e);
      }
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || showYouTube) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * duration;
    
    audioRef.current.currentTime = seekTime;
  };
  
  const nextTrack = () => {
    const tracks = showAmbient ? ambientTracks : musicTracks;
    const currentIndex = tracks.findIndex(track => track.title === currentTrack.title);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    
    // If moving to YouTube track, enable YouTube mode
    if (tracks[nextIndex].youtubeId) {
      setShowYouTube(true);
    } else {
      setShowYouTube(false);
    }
    
    // If playing, ensure new track starts playing
    if (isPlaying && !showYouTube) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error("Playback failed:", e));
      }, 100);
    }
  };
  
  const prevTrack = () => {
    const tracks = showAmbient ? ambientTracks : musicTracks;
    const currentIndex = tracks.findIndex(track => track.title === currentTrack.title);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    
    // If moving to YouTube track, enable YouTube mode
    if (tracks[prevIndex].youtubeId) {
      setShowYouTube(true);
    } else {
      setShowYouTube(false);
    }
    
    // If playing, ensure new track starts playing
    if (isPlaying && !showYouTube) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error("Playback failed:", e));
      }, 100);
    }
  };
  
  const toggleCategory = () => {
    setShowAmbient(!showAmbient);
    const newTrack = showAmbient ? musicTracks[0] : ambientTracks[0];
    setCurrentTrack(newTrack);
    
    // If moving to YouTube track, enable YouTube mode
    if (newTrack.youtubeId) {
      setShowYouTube(true);
    } else {
      setShowYouTube(false);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  
  // Add persistence effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // When tab/window is hidden, ensure music keeps playing
        if (isPlaying) {
          if (showYouTube && youtubeRef.current) {
            try {
              youtubeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch (e) {
              console.error("YouTube control failed:", e);
            }
          } else if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, showYouTube]);

  // Update minimizeToMiniPlayer to ensure playback continues
  const minimizeToMiniPlayer = () => {
    setShowMiniPlayer(true);
    setIsFullscreen(false);
    // Ensure playback continues
    if (isPlaying) {
      if (showYouTube && youtubeRef.current) {
        try {
          youtubeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } catch (e) {
          console.error("YouTube control failed:", e);
        }
      } else if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  };
  
  return (
    <>
      <AnimatePresence>
        {!showMiniPlayer && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`fixed ${isFullscreen ? 'inset-0' : 'left-0 top-0 bottom-0 w-[400px]'} z-50 bg-transparent backdrop-blur-sm`}
          >
            <div className={`h-full flex flex-col ${isFullscreen ? 'p-6' : 'p-4'} bg-transparent`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">Now Playing</h2>
                </div>
                <div className="flex items-center gap-2">
                  {isFullscreen ? (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Minimize2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  )}
        <button 
                    onClick={minimizeToMiniPlayer}
                    className="text-white/60 hover:text-white transition-colors"
        >
                    <X className="w-5 h-5" />
        </button>
                </div>
      </div>
      
              {isFullscreen ? (
                // Fullscreen Layout
                <div className="flex-1 flex flex-col gap-6">
                  {/* Video Area */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-transparent">
      {showYouTube && currentTrack.youtubeId ? (
          <iframe 
            ref={youtubeRef}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?enablejsapi=1&autoplay=${isPlaying ? '1' : '0'}&controls=0&modestbranding=1&rel=0&showinfo=0`}
            title="YouTube music player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.img 
                          src={currentTrack.artwork}
                          alt={currentTrack.title}
                          className="w-full h-full object-cover"
                          animate={{ rotate: isPlaying ? 360 : 0 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white mb-1">{currentTrack.title}</h3>
                    <p className="text-white/60">{currentTrack.artist}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-4">
                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-8">
                      <button 
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`${isShuffled ? 'text-blue-500' : 'text-white/60'} hover:text-white transition-colors`}
                      >
                        <Shuffle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={prevTrack}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <SkipBack className="w-8 h-8" />
                      </button>
                      <button 
                        onClick={togglePlay}
                        className="w-16 h-16 flex items-center justify-center bg-white/80 text-black rounded-full hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                      </button>
                      <button 
                        onClick={nextTrack}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <SkipForward className="w-8 h-8" />
                      </button>
                      <button 
                        onClick={() => setIsRepeated(!isRepeated)}
                        className={`${isRepeated ? 'text-blue-500' : 'text-white/60'} hover:text-white transition-colors`}
                      >
                        <Repeat className="w-5 h-5" />
                      </button>
                    </div>
          </div>
        </div>
      ) : (
                // Updated Compact Layout
                <div className="flex-1 flex flex-col">
                  {/* Updated Artwork/Video Area */}
                  <div className="aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-transparent">
                    {showYouTube && currentTrack.youtubeId ? (
                      <div className="w-full h-full">
                        <iframe 
                          ref={youtubeRef}
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?enablejsapi=1&autoplay=${isPlaying ? '1' : '0'}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                          title="YouTube music player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
            />
          </div>
                    ) : (
                      <motion.img 
                        src={currentTrack.artwork}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    )}
          </div>
          
                  {/* Track Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{currentTrack.title}</h3>
                    <p className="text-white/60">{currentTrack.artist}</p>
          </div>
      
                  {/* Controls */}
                  <div className="flex flex-col gap-4">
                    {/* Playback Controls */}
                    <div className="flex items-center justify-between">
        <button 
          onClick={prevTrack}
                        className="text-white/60 hover:text-white transition-colors"
        >
                        <SkipBack className="w-6 h-6" />
        </button>
        <button 
          onClick={togglePlay}
                        className="w-14 h-14 flex items-center justify-center bg-white/80 text-black rounded-full hover:scale-105 transition-transform"
        >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        <button 
          onClick={nextTrack}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Up Next */}
                  <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white/60 mb-2">Up Next</h4>
                    <div className="space-y-2">
                      {(showAmbient ? ambientTracks : musicTracks).slice(0, 3).map((track) => (
                        <button
                          key={track.title}
                          onClick={() => {
                            setCurrentTrack(track);
                            setShowYouTube(!!track.youtubeId);
                            if (!isPlaying) setIsPlaying(true);
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-black/20 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-md overflow-hidden">
                            <img src={track.artwork} alt={track.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-sm font-medium text-white truncate">{track.title}</h4>
                            <p className="text-xs text-white/60 truncate">{track.artist}</p>
                          </div>
        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Updated Mini Player */}
      <AnimatePresence>
        {showMiniPlayer && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
            {showYouTube && currentTrack.youtubeId ? (
              <div className="absolute bottom-full left-0 mb-2 w-80 aspect-video">
                <iframe 
                  ref={youtubeRef}
                  className="w-full h-full rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?enablejsapi=1&autoplay=${isPlaying ? '1' : '0'}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title="YouTube music player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
          />
        </div>
            ) : null}
            <MiniPlayer
              title={currentTrack.title}
              artist={currentTrack.artist}
              poster={currentTrack.artwork || ''}
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onClose={() => {
                setShowMiniPlayer(false);
                if (!isPlaying) setIsPlaying(true);
              }}
            />
    </div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
    </>
  );
};

export default MusicPlayer;
