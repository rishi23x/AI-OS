import { motion } from 'framer-motion';
import FloatingMetricCard from './FloatingMetricCard';
import AIOrb from './AIOrb';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="platform">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] -z-10 mix-blend-screen" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] -z-10" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Text Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide uppercase">AI Business System v4.0</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The Intelligence Layer For The <br />
            <span className="text-gradient-cyan">Real World Economy</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI that connects data, operations and decisions into one spatially-aware business intelligence system.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button className="px-8 py-4 bg-primary text-black font-bold rounded-xl text-lg hover:bg-white transition-colors glow-cyan">
              Initialize Copilot
            </button>
            <button className="px-8 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-xl text-lg hover:bg-white/10 transition-colors">
              Explore Architecture
            </button>
          </motion.div>
        </div>

        {/* 3D Orb & Metrics */}
        <div className="relative flex items-center justify-center h-[500px] lg:h-[700px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute z-10"
          >
            <AIOrb />
          </motion.div>
          
          <FloatingMetricCard 
            title="AI Operations Score" 
            value="94%" 
            delay={0.6}
            yOffset={-15}
            className="top-[10%] left-[5%] md:-left-[10%] z-20"
          />
          <FloatingMetricCard 
            title="Problems Detected" 
            value="12" 
            delay={0.8}
            yOffset={20}
            className="bottom-[20%] left-[10%] md:left-[0%] z-20"
          />
          <FloatingMetricCard 
            title="Efficiency Gain" 
            value="+31%" 
            delay={1.0}
            yOffset={-25}
            className="top-[30%] right-[0%] md:-right-[15%] z-20"
          />
        </div>
      </div>
    </section>
  );
}
