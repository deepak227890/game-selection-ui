import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground({ activeGame }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        key={activeGame.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Base blurry image background from the active game */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-50 mix-blend-screen scale-110 blur-xl"
          style={{ backgroundImage: `url(${activeGame.bgUrl})` }}
        />
        
        {/* Overlay gradient for depth and premium feel */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeGame.themeColor} opacity-50 mix-blend-overlay`}></div>
        
        {/* Radial vignette mask for the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
        
        {/* Animated glowing orb behind cards */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)`
          }}
        />
      </motion.div>
      
      {/* Scanline overlay for that subtle console tech feel */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none opacity-40 mix-blend-overlay"></div>
    </div>
  );
}
