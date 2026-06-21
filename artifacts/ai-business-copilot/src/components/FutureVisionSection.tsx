import { motion } from 'framer-motion';
import { Factory, Truck, Landmark, HeartPulse, Building2 } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';

export default function FutureVisionSection() {
  const industries = [
    { name: "Manufacturing", icon: <Factory className="w-8 h-8" /> },
    { name: "Logistics & Supply", icon: <Truck className="w-8 h-8" /> },
    { name: "Global Finance", icon: <Landmark className="w-8 h-8" /> },
    { name: "Healthcare Systems", icon: <HeartPulse className="w-8 h-8" /> },
    { name: "Smart Infrastructure", icon: <Building2 className="w-8 h-8" /> },
  ];

  return (
    <section className="py-32 relative z-10" id="industries">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.1] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Built For The <span className="text-gradient-cyan">Physical World</span>
          </h2>
          <p className="text-xl text-white/60 font-light">
            AI Business Copilot is designed to solve hard problems in heavy industries. Where downtime costs millions, our intelligence layer keeps operations flowing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <LiquidGlassCard tilt={true} glowColor="accent" className="w-48 h-48 flex flex-col items-center justify-center text-center group cursor-pointer">
                <div className="text-white/40 group-hover:text-primary transition-colors duration-300 mb-4 scale-110">
                  {ind.icon}
                </div>
                <h4 className="font-bold text-white/90 group-hover:text-white transition-colors">{ind.name}</h4>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
