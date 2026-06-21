import { motion } from 'framer-motion';

interface FloatingMetricCardProps {
  title: string;
  value: string;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export default function FloatingMetricCard({ 
  title, 
  value, 
  delay = 0,
  className = '',
  yOffset = 20
}: FloatingMetricCardProps) {
  return (
    <motion.div
      className={`absolute glass-panel p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, yOffset, 0] 
      }}
      transition={{ 
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { 
          duration: 6 + Math.random() * 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay 
        }
      }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.5)', zIndex: 10 }}
    >
      <div className="text-xs text-white/60 uppercase tracking-wider mb-1 font-mono">{title}</div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="absolute inset-0 bg-primary/5 blur-xl -z-10 rounded-full" />
    </motion.div>
  );
}
