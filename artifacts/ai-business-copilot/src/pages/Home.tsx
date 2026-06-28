import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import DashboardSection from '@/components/DashboardSection';
import FutureVisionSection from '@/components/FutureVisionSection';
import CustomCursor from '@/components/CustomCursor';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white">
      <Navigation />
      
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CapabilitiesSection />
        <DashboardSection />
        <FutureVisionSection />
      </main>

      {/* CTA & Footer combined */}
      <footer className="relative border-t border-white/10 pt-32 pb-12 overflow-hidden" id="company">
        {/* Glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-t-[100%]" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-32">
            <motion.h2 
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Start Your AI <br />
              <span className="text-gradient-cyan">Transformation</span>
            </motion.h2>
            <p className="text-xl text-white/60 font-light mb-10">
              Join industry leaders using our intelligence layer to outmaneuver the market.
            </p>
            
            <form className="w-full flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your enterprise email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <button className="bg-primary text-black font-bold rounded-xl px-8 py-4 hover:bg-white transition-colors glow-cyan whitespace-nowrap">
                Request Access
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-white/10 pb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="font-bold text-2xl tracking-tight text-white mb-6">
                Copilot
              </div>
              <p className="text-sm text-white/40">
                The intelligence layer for the real world economy.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-primary transition-colors">Agents</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Command Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} AI Business Copilot Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary/50" /> System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
