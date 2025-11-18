import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './LightningLogo.css';

type LightningLogoProps = {
  className?: string;
};

const LightningLogo: React.FC<LightningLogoProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boltPath = 'M67 6L25 72h24l-10 42 54-74H69l-2-34z';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const intensityMotion = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const [intensity, setIntensity] = useState(0.25);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    return intensityMotion.on('change', (value) => setIntensity(value));
  }, [intensityMotion]);

  const isCharged = intensity > 0.65;

  const cssVars = useMemo(() => {
    const clamped = Math.min(Math.max(intensity, 0), 1);
    return {
      '--intensity': clamped.toFixed(3),
      '--glow-scale': (0.75 + clamped * 0.45).toFixed(3),
      '--glow-opacity': (0.35 + clamped * 0.55).toFixed(3),
      '--flash-strength': (0.3 + clamped * 0.7).toFixed(3),
      '--spark-speed': `${(2.8 - clamped * 1.2).toFixed(2)}s`,
    } as React.CSSProperties;
  }, [intensity]);

  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = 'touches' in event ? event.touches[0] : event;
    if (!point) return;
    const relativeX = point.clientX - rect.left;
    const relativeY = point.clientY - rect.top;
    const normalizedX = (relativeX / rect.width - 0.5) * 2;
    const normalizedY = (relativeY / rect.height - 0.5) * 2;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    setTilt({ x: clamp(normalizedX) * 10, y: clamp(-normalizedY) * 10 });
    setCursor({
      x: `${(relativeX / rect.width) * 100}%`,
      y: `${(relativeY / rect.height) * 100}%`,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTilt({ x: 0, y: 0 });
    setCursor({ x: '50%', y: '50%' });
  };

  const classes = [
    'lightning-logo',
    className,
    isHovered ? 'is-hovered' : '',
    isPressed ? 'is-pressed' : '',
    isCharged ? 'is-charged' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      ref={containerRef}
      className={classes}
      style={{
        ...cssVars,
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
      onMouseMove={handlePointerMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => {
        setIsPressed(true);
        setIsHovered(true);
      }}
      onTouchMove={handlePointerMove}
      onTouchEnd={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onTouchCancel={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onClick={() => setWaveKey((prev) => prev + 1)}
      role="presentation"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <div className="lightning-logo__storm" aria-hidden="true">
        <span className="lightning-logo__arc lightning-logo__arc--one" />
        <span className="lightning-logo__arc lightning-logo__arc--two" />
        <span className="lightning-logo__arc lightning-logo__arc--three" />
      </div>
      <div className="lightning-logo__sparks" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="lightning-logo__flash" aria-hidden="true" />
      <div className="lightning-logo__glow" aria-hidden="true" />
      {waveKey > 0 && (
        <motion.span
          key={waveKey}
          className="lightning-logo__shockwave"
          aria-hidden="true"
          initial={{ scale: 0.3, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
      {isHovered && (
        <motion.span
          className="lightning-logo__cursor"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}
      <svg
        className="lightning-logo__icon"
        viewBox="0 0 120 120"
        role="img"
        aria-label="Animated lightning bolt"
      >
        <defs>
          <linearGradient id="boltGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="65%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id="boltGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          className="lightning-logo__bolt"
          d={boltPath}
          fill="url(#boltGradient)"
          filter="url(#boltGlow)"
          animate={{
            y: isPressed ? 1 : 0,
            x: isPressed ? -1 : 0,
          }}
          transition={{ duration: 0.12 }}
        />
        <path
          className="lightning-logo__bolt-outline"
          d={boltPath}
          fill="none"
          stroke="#fff7ed"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default LightningLogo;
