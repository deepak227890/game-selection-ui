import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import GameCarousel from "./components/GameCarousel";
import VideoPlayer from "./components/VideoPlayer";
import FloatingLayer from "./components/FloatingLayer";
import RadialSelector from "./components/RadialSelector";
import AmbientParticles from "./components/AmbientParticles";
import { games } from "./data/games";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const [mode, setMode] = useState("carousel");
  const [previewOnHover, setPreviewOnHover] = useState(true);

  const selected = games[selectedIndex];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const parallaxX = useSpring(x, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(y, { stiffness: 60, damping: 20 });
  const reduceMotion = useReducedMotion();
  const rafRef = useRef(0);

  const onSelect = (index, open) => {
    setSelectedIndex(index);
    if (open) setVideoOpen(true);
  };

  const onMove = (e) => {
    if (reduceMotion) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) * 0.02;
      const offsetY = (e.clientY - innerHeight / 2) * 0.02;
      x.set(offsetX);
      y.set(offsetY);
      rafRef.current = 0;
    });
  };

  const dynamicBackground = useMemo(() => {
    return {
      backgroundImage: `${selected.backdrop}, radial-gradient(1200px circle at 70% 30%, ${selected.accent}33, transparent 60%), radial-gradient(900px circle at 20% 80%, ${selected.color}22, transparent 55%)`,
    };
  }, [selected]);

  return (
    <div
      className="min-h-screen w-full bg-black text-white overflow-hidden"
      onMouseMove={onMove}
    >
      <motion.div
        className="absolute inset-0 transition-colors duration-700"
        style={dynamicBackground}
      />

      <div className="absolute inset-0 bg-noise" />
      <AmbientParticles />

      <FloatingLayer parallaxX={parallaxX} parallaxY={parallaxY} />

      <main className="relative z-20 min-h-screen w-full px-6 md:px-10 pt-8 pb-16 ui-enter">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              NovaCore
            </div>
            <div className="text-2xl md:text-3xl font-display">Game Library</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="button-glow"
              onClick={() => setPreviewOnHover((v) => !v)}
            >
              Preview: {previewOnHover ? "On" : "Off"}
            </button>
            <button
              type="button"
              className="button-glow"
              onClick={() =>
                setMode((m) => (m === "carousel" ? "radial" : "carousel"))
              }
            >
              Mode: {mode === "carousel" ? "Carousel" : "Radial"}
            </button>
          </div>
        </header>

        <section className="mt-10 md:mt-16">
          {mode === "carousel" ? (
            <GameCarousel
              games={games}
              selectedIndex={selectedIndex}
              onSelect={onSelect}
              previewOnHover={previewOnHover}
            />
          ) : (
            <RadialSelector
              games={games}
              selectedIndex={selectedIndex}
              onSelect={onSelect}
            />
          )}
        </section>

        <section className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">
              Selected
            </div>
            <div className="text-3xl md:text-4xl font-display glow-text">
              {selected.title}
            </div>
            <div className="mt-2 text-white/70">{selected.meta}</div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="button-primary"
              onClick={() => setVideoOpen(true)}
            >
              Enter World
            </button>
            <button type="button" className="button-glow">
              Add to Queue
            </button>
          </div>
        </section>
      </main>

      {/* Preload videos for smoother cinematic transitions */}
      <div className="hidden">
        {games.map((game) => (
          <video key={game.id} src={game.video} preload="auto" />
        ))}
      </div>

      <VideoPlayer
        open={videoOpen}
        game={selected}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
}
