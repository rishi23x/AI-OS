import { motion } from 'framer-motion';
import { ReactNode, useRef, useState, MouseEvent } from 'react';

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'accent' | 'none';
  tilt?: boolean;
}

export default function LiquidGlassCard({ 
  children, 
  className = '', 
  glowColor = 'none',
  tilt = true 
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation (-10 to 10 degrees)
    const rX = -(y / (rect.height / 2)) * 10;
    const rY = (x / (rect.width / 2)) * 10;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  let glowClass = '';
  if (isHovered) {
    if (glowColor === 'cyan') glowClass = 'glow-cyan';
    if (glowColor === 'violet') glowClass = 'glow-violet';
    if (glowColor === 'accent') glowClass = 'glow-accent';
  }

  return (
    <motion.div
      ref={cardRef}
      className={`glass-panel glass-panel-highlight rounded-2xl p-6 relative overflow-hidden transition-shadow duration-300 ${glowClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: isHovered && tilt ? rotateX : 0,
        rotateY: isHovered && tilt ? rotateY : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background glow gradient that follows mouse slightly */}
      {isHovered && glowColor !== 'none' && (
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, ${
              glowColor === 'cyan' ? '#00D4FF' : 
              glowColor === 'violet' ? '#7B2FFF' : 
              '#0066FF'
            } 0%, transparent 60%)`
          }}
        />
      )}
      
      <div className="relative z-10" style={{ transform: isHovered && tilt ? 'translateZ(20px)' : 'none', transition: 'transform 0.3s ease-out' }}>
        {children}
      </div>
    </motion.div>
  );
}
