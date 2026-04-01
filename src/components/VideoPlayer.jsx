import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Full-screen cinematic video player overlay with smooth transition.
export default function VideoPlayer({ open, game, onClose }) {
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef(null);
  const introSeconds = 12;

  useEffect(() => {
    if (!open) setReady(false);
  }, [open]);

  useEffect(() => {
    if (!open || !videoRef.current) return;
    const play = async () => {
      try {
        await videoRef.current.play();
      } catch {
        // Autoplay can be blocked; user can hit play.
      }
    };
    play();
  }, [open, game]);

  const updateBuffered = () => {
    const video = videoRef.current;
    if (!video || !video.buffered || video.buffered.length === 0) return;
    const end = video.buffered.end(video.buffered.length - 1);
    setBufferedEnd(end);
  };

  const handleSkipIntro = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(introSeconds, duration || introSeconds);
  };

  return (
    <AnimatePresence>
      {open && game && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            layoutId={`card-${game.id}`}
            className="relative z-10 w-[92vw] max-w-[1200px] aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            initial={{ scale: 0.92, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 30 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <img
              src={game.poster}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                ready ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              ref={videoRef}
              src={game.video}
              autoPlay
              controls
              playsInline
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                ready ? "opacity-100" : "opacity-0"
              }`}
              onCanPlay={() => setReady(true)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onProgress={updateBuffered}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
            />
            <div className="absolute inset-0 pointer-events-none video-vignette" />

            {/* Thumbnail + buffered indicator */}
            <div className="absolute left-4 bottom-4 flex items-center gap-4">
              <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <img
                  src={game.poster}
                  alt=""
                  className="h-full w-full object-cover"
                />
                {isBuffering && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs uppercase tracking-[0.3em] text-white/80">
                    Buffering
                  </div>
                )}
              </div>
              <div className="w-56">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                  Stream
                </div>
                <div className="mt-2 buffer-track">
                  <div
                    className="buffer-bar"
                    style={{
                      width: duration
                        ? `${Math.min((bufferedEnd / duration) * 100, 100)}%`
                        : "0%",
                    }}
                  />
                  <div
                    className="playhead"
                    style={{
                      width: duration
                        ? `${Math.min((currentTime / duration) * 100, 100)}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Skip intro micro-interaction */}
            {ready && currentTime < introSeconds && (
              <button
                type="button"
                onClick={handleSkipIntro}
                className="absolute right-5 bottom-5 button-glow"
              >
                Skip Intro
              </button>
            )}
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 button-glow"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
