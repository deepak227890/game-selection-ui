import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./components/VideoPlayer";
import AmbientParticles from "./components/AmbientParticles";
import { games } from "./data/games";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const selected = games[selectedIndex];
  const nextGame = games[(selectedIndex + 1) % games.length];

  const dynamicBackground = useMemo(() => {
    return {
      backgroundImage: `radial-gradient(900px circle at 15% 30%, rgba(220, 70, 70, 0.32), transparent 65%), radial-gradient(900px circle at 85% 35%, rgba(60, 220, 120, 0.3), transparent 60%), ${selected.backdrop}`,
    };
  }, [selected]);

  return (
    <div className="app-shell">
      <motion.div
        className="absolute inset-0 transition-colors duration-700"
        style={dynamicBackground}
      />
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-noise" />
      <AmbientParticles />

      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      <main className="relative z-20 min-h-screen w-full px-6 md:px-12 pt-6 pb-16 ui-enter">
        <header className="hud-top">
          <button type="button" className="icon-button" aria-label="Grid menu">
            <span className="icon-grid" />
          </button>
          <div className="hud-title">
            <span className="hud-title-text">SELECT YOUR GAME</span>
          </div>
          <button type="button" className="icon-button" aria-label="More options">
            <span className="icon-menu"><span /></span>
          </button>
        </header>

        <section className="mt-8">
          <div className="text-sm uppercase tracking-[0.35em] text-white/60">
            {selected.title}
          </div>
          <div className="mt-2 inline-flex items-center gap-3">
            <span className="mode-pill">Competition Mode</span>
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">
              Tap your card to add players. You can have up to 2 players in each team.
            </span>
          </div>
        </section>

        <section className="game-stage">
          <motion.button
            type="button"
            className="game-panel game-panel-primary"
            onClick={() => setVideoOpen(true)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="game-panel__top"
              style={{ backgroundColor: selected.color }}
            />
            <div
              className="game-panel__body"
              style={{ backgroundImage: `url(${selected.poster})` }}
            >
              <div className="game-panel__overlay" />
              <div className="game-panel__content">
                <div className="how-to-play">HOW TO PLAY</div>
                <div className="game-title">{selected.title.toUpperCase()}</div>
              </div>
            </div>
            <div className="game-panel__footer">
              <div className="footer-title">{selected.title}</div>
              <div className="footer-meta">
                PLAYERS: 2-4 &nbsp; ROUNDS: 10+ &nbsp; AGE: 6+
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            className="game-panel game-panel-secondary"
            onClick={() => setSelectedIndex((i) => (i + 1) % games.length)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="game-panel__top"
              style={{ backgroundColor: nextGame.color }}
            />
            <div
              className="game-panel__body"
              style={{ backgroundImage: `url(${nextGame.poster})` }}
            >
              <div className="game-panel__overlay" />
              <div className="game-panel__content">
                <div className="game-title">{nextGame.title.toUpperCase()}</div>
              </div>
            </div>
            <div className="game-panel__footer">
              <div className="footer-title">{nextGame.title}</div>
            </div>
          </motion.button>
        </section>

        <div className="game-controls">
          <button
            type="button"
            className="arrow-button"
            onClick={() =>
              setSelectedIndex((i) => (i - 1 + games.length) % games.length)
            }
            aria-label="Previous game"
          >
            ‹
          </button>
          <button
            type="button"
            className="start-button"
            onClick={() => setVideoOpen(true)}
          >
            START GAME
          </button>
          <button
            type="button"
            className="arrow-button"
            onClick={() => setSelectedIndex((i) => (i + 1) % games.length)}
            aria-label="Next game"
          >
            ›
          </button>
        </div>
      </main>

      <VideoPlayer
        open={videoOpen}
        game={selected}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
}
