import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Easing: cubic ease-out
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const Achievements = ({ title, amount, isLive, children }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [countComplete, setCountComplete] = useState(false);
  const rafRef = useRef(null);
  const hasStarted = useRef(false);

  // Restart animation whenever `amount` changes (live data arrived)
  useEffect(() => {
    if (!hasStarted.current) return;
    animateTo(amount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const animateTo = (target) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCountComplete(false);
    const duration = Math.min(1200, 400 + target * 0.3); // scales slightly with value, capped at 1.2s
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayNumber(Math.round(easeOut(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setCountComplete(true);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  };

  const handleViewportEnter = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    animateTo(amount);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <motion.div
      className="flex items-center gap-x-4 rounded-xl px-5 py-4 border transition-all duration-200"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true }}
    >
      <span className="text-3xl lg:text-2xl" style={{ color: "var(--ink-3)" }}>
        {children}
      </span>
      <div className="flex flex-col gap-y-1 min-w-0">
        <div className="flex items-center gap-x-1.5">
          <span
            className="mono-font text-2xl lg:text-xl font-medium"
            style={{ color: "var(--brand-local)" }}
          >
            {displayNumber}
            {countComplete && "+"}
          </span>
          {isLive && (
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "var(--brand-local)", opacity: 0.7 }}
              title="Live data"
            />
          )}
        </div>
        <span className="text-sm tracking-wide truncate" style={{ color: "var(--ink-2)" }}>
          {title}
        </span>
      </div>
    </motion.div>
  );
};

export default Achievements;


