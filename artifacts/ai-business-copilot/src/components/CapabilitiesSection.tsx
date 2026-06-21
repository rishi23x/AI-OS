import { motion } from 'framer-motion';
import { LineChart, Settings, ShieldAlert, BarChart3, Zap, BrainCircuit } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      icon: <LineChart className="w-6 h-6 text-primary" />,
      title: "Analytics Agent",
      description: "Continuously scans millions of data points to surface trends before they impact the bottom line."
    },
    {
      icon: <Settings className="w-6 h-6 text-secondary" />,
      title: "Operations Agent",
      description: "Optimizes supply chain routing, inventory levels, and workforce allocation in real-time."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-accent" />,
      title: "Strategy Agent",
      description: "Simulates 'what-if' scenarios to help executives navigate complex market shifts."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-destructive" />,
      title: "Alert Agent",
      description: "Detects anomalies in operational patterns, instantly notifying teams of potential failures."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Report Agent",
      description: "Synthesizes raw data into executive-ready narratives and visually dense board presentations."
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary" />,
      title: "Automation Agent",
      description: "Executes routine operational fixes autonomously, freeing humans for high-leverage tasks."
    }
  ];

  return (
    <section className="py-32 relative z-10" id="capabilities">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              A Hive Mind Of <span className="text-gradient-cyan">Specialized Agents</span>
            </h2>
            <p className="text-xl text-white/60 font-light">
              Not a generalized chatbot. A suite of purpose-built AI agents acting as digital executives for every department.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors text-sm font-bold uppercase tracking-wider">
            View All Capabilities
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <LiquidGlassCard glowColor="cyan" tilt={true} className="h-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-background border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{cap.title}</h3>
                </div>
                <p className="text-white/60 leading-relaxed font-light">{cap.description}</p>
                <div className="mt-6 flex items-center text-xs font-mono text-primary/50 group-hover:text-primary transition-colors">
                  <span className="mr-2">&gt;</span> Initialize Module
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
