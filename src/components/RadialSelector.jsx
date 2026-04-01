import { motion } from "framer-motion";

// Optional radial selector mode.
export default function RadialSelector({ games, selectedIndex, onSelect }) {
  const radius = 190;
  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      <div className="absolute inset-0 radial-grid" />
      {games.map((game, i) => {
        const angle = (i / games.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = i === selectedIndex;
        return (
          <motion.button
            key={game.id}
            type="button"
            onClick={() => onSelect(i, true)}
            className={`radial-chip ${isActive ? "radial-chip-active" : ""}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
          >
            {game.title}
          </motion.button>
        );
      })}
      <div className="absolute w-36 h-36 rounded-full border border-cyan-400/40 glow-ring" />
    </div>
  );
}
