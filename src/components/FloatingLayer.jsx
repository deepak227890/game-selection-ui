import { motion } from "framer-motion";

// Floating UI overlay with parallax depth.
export default function FloatingLayer({ parallaxX, parallaxY }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10"
      style={{ x: parallaxX, y: parallaxY }}
    >
      <div className="absolute top-10 left-10 hud-panel">SYSTEM</div>
      <div className="absolute top-24 right-10 hud-panel">SYNC 98%</div>
      <div className="absolute bottom-16 left-16 hud-line" />
      <div className="absolute bottom-20 right-16 hud-line" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hud-ring" />
    </motion.div>
  );
}
