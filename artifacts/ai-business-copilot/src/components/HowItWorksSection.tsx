import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Cpu, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlassCard from './LiquidGlassCard';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    // Draw SVG line animation
    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

  }, []);

  const steps = [
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Data Sources",
      description: "Seamlessly ingest live data from your ERP, CRM, and operational systems.",
      color: "cyan" as const
    },
    {
      icon: <Cpu className="w-8 h-8 text-secondary" />,
      title: "AI Intelligence Engine",
      description: "Our proprietary models detect anomalies, predict outcomes, and find hidden correlations.",
      color: "violet" as const
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Business Decisions",
      description: "Actionable strategic recommendations delivered directly to your command center.",
      color: "accent" as const
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative z-10" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            How The <span className="text-gradient-cyan">System Thinks</span>
          </h2>
          <p className="text-xl text-white/60 font-light">
            A continuous loop of perception, cognition, and action across your entire business.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated SVG Path linking the cards */}
          <div className="absolute top-1/2 left-0 w-full h-[400px] -translate-y-1/2 -z-10 hidden lg:block pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                ref={pathRef}
                d="M 150 200 C 350 200, 350 100, 500 100 C 650 100, 650 300, 850 300" 
                stroke="url(#gradient-line)" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#7B2FFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Animated particles along the line */}
            <motion.div 
              className="absolute w-3 h-3 bg-primary rounded-full glow-cyan"
              animate={{
                left: ["15%", "50%", "85%"],
                top: ["50%", "25%", "75%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className={idx === 1 ? "lg:-mt-16" : idx === 2 ? "lg:mt-16" : ""}
              >
                <LiquidGlassCard glowColor={step.color} className="h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed font-light">{step.description}</p>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
