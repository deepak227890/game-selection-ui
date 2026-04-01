import React, { useState, useEffect } from 'react';
import { Wifi, BatteryFull, Search, Bell, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopNav() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex justify-between items-center text-white/80 pointer-events-none"
    >
      <div className="flex items-center gap-8 pointer-events-auto">
        <div className="flex items-center gap-3 glass px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="font-display font-bold tracking-wider text-sm">PLAYER_ONE</span>
        </div>
        
        <div className="flex gap-6">
          <button className="hover:text-white hover:scale-110 transition-all"><Search size={20} /></button>
          <button className="hover:text-white hover:scale-110 transition-all"><Bell size={20} /></button>
          <button className="hover:text-white hover:scale-110 transition-all"><Settings size={20} /></button>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <h1 className="font-display font-black text-2xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(176,38,255,0.8)] opacity-90 mix-blend-screen">
          NEXUS
        </h1>
      </div>

      <div className="flex items-center gap-6 font-mono text-sm tracking-wider">
        <div className="flex items-center gap-3">
          <Wifi size={18} />
          <BatteryFull size={20} className="text-green-400" />
        </div>
        <div className="glass px-4 py-1.5 rounded-full font-bold">
          {time}
        </div>
      </div>
    </motion.nav>
  );
}
