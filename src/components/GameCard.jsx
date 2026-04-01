import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Single game card with glass/holo treatment + hover preview video.
export default function GameCard({
  game,
  isActive,
  onSelect,
  previewOnHover,
}) {
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHover && previewOnHover) {
      videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHover, previewOnHover]);

  return (
    <motion.button
      type="button"
      layoutId={`card-${game.id}`}
      onClick={onSelect}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`group relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px] aspect-[2/3] rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] ${
        isActive ? "card-active" : ""
      }`}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-label={`Open ${game.title}`}
      style={{
        boxShadow: isActive
          ? `0 30px 120px rgba(0,0,0,0.55), 0 0 40px ${game.accent}55`
          : undefined,
      }}
    >
      <div className="absolute inset-0">
        <img
          src={game.poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-transparent to-black/60" />
      </div>

      {/* Hover preview video */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        poster={game.poster}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHover && previewOnHover ? "opacity-100" : "opacity-0"
        }`}
        src={game.preview}
      />

      {/* Holographic sheen */}
      <div className="absolute -inset-12 opacity-40 blur-2xl hologram-sheen" />

      {/* Animated neon border */}
      <div className="absolute inset-0 rounded-3xl neon-border" />

      <div className="relative h-full w-full p-6 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Next-Gen
        </div>
        <div className="mt-2 text-2xl md:text-3xl font-display text-white drop-shadow-[0_0_20px_rgba(99,255,255,0.45)]">
          {game.title}
        </div>
        <div className="mt-2 text-sm text-white/70">{game.meta}</div>

        <div className="mt-5 flex items-center gap-3">
          <span className="chip">Preview</span>
          <span className="chip">Launch</span>
        </div>
      </div>
    </motion.button>
  );
}
