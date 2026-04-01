import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameCard from './GameCard';

export default function Carousel({ games, activeIndex, setActiveIndex, onPlay }) {
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (activeIndex < games.length - 1) {
      setDirection(1);
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Enter') onPlay(games[activeIndex]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, games]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? -45 : 45,
      z: -500,
      opacity: 0,
      scale: 0.6
    }),
    center: {
      zIndex: 10,
      x: 0,
      rotateY: 0,
      z: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      rotateY: direction < 0 ? -45 : 45,
      z: -500,
      opacity: 0,
      scale: 0.6
    })
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px] overflow-visible mt-20">
      
      {/* Background Cards for Depth (Left & Right Previews) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Left Side Cards */}
        {games.map((game, i) => {
          if (i >= activeIndex) return null;
          const offset = activeIndex - i;
          return (
            <motion.div
              key={game.id}
              className="absolute w-[400px] h-[550px] opacity-30 blur-[2px]"
              animate={{
                x: -300 - (offset * 150),
                scale: 0.8 - (offset * 0.1),
                rotateY: 25,
                z: -300 - (offset * 100)
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <GameCard game={game} isActive={false} previewOnHover={true} onSelect={() => {setActiveIndex(i); setDirection(-1)}} />
            </motion.div>
          );
        })}

        {/* Right Side Cards */}
        {games.map((game, i) => {
          if (i <= activeIndex) return null;
          const offset = i - activeIndex;
          return (
            <motion.div
              key={game.id}
              className="absolute w-[400px] h-[550px] opacity-30 blur-[2px]"
              animate={{
                x: 300 + (offset * 150),
                scale: 0.8 - (offset * 0.1),
                rotateY: -25,
                z: -300 - (offset * 100)
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <GameCard game={game} isActive={false} previewOnHover={true} onSelect={() => {setActiveIndex(i); setDirection(1)}} />
            </motion.div>
          );
        })}

      </div>

      {/* Center Active Card */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 150, damping: 25 },
            opacity: { duration: 0.4 },
            rotateY: { type: "spring", stiffness: 150, damping: 25 },
            scale: { type: "spring", stiffness: 150, damping: 25 }
          }}
          className="absolute w-[450px] h-[600px] z-20"
        >
          <GameCard 
            game={games[activeIndex]} 
            isActive={true} 
            previewOnHover={true}
            onSelect={() => onPlay(games[activeIndex])} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Swipe Overlay Layer for Touch or Mouse Swipe (Simplified) */}
      <div 
        className="absolute inset-0 z-30 opacity-0 bg-transparent"
        onWheel={(e) => {
          if (e.deltaY > 0) handleNext();
          else if (e.deltaY < 0) handlePrev();
        }}
      ></div>
    </div>
  );
}
