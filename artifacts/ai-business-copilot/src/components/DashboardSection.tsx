import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, Bell, Grid, Layers, LayoutDashboard, Settings, User } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';

const data = [
  { name: '00:00', revenue: 4000, efficiency: 2400 },
  { name: '04:00', revenue: 3000, efficiency: 1398 },
  { name: '08:00', revenue: 2000, efficiency: 9800 },
  { name: '12:00', revenue: 2780, efficiency: 3908 },
  { name: '16:00', revenue: 1890, efficiency: 4800 },
  { name: '20:00', revenue: 2390, efficiency: 3800 },
  { name: '24:00', revenue: 3490, efficiency: 4300 },
];

export default function DashboardSection() {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The <span className="text-gradient-cyan">Command Center</span>
          </h2>
          <p className="text-xl text-white/60 font-light">
            Step into the future of business operations. Dense, actionable, immersive.
          </p>
        </div>

        {/* Browser / OS Frame Mockup */}
        <motion.div 
          className="rounded-3xl border border-white/10 bg-background/80 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(0,212,255,0.15)] flex flex-col max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ perspective: 1000 }}
        >
          {/* OS Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-md bg-black/40 border border-white/5 text-xs text-white/40 font-mono">
              <ShieldIcon /> Secure Connection
            </div>
          </div>

          <div className="flex h-[600px] md:h-[700px]">
            {/* Sidebar */}
            <div className="w-16 md:w-64 border-r border-white/10 bg-black/40 flex flex-col py-6">
              <div className="flex items-center gap-3 px-4 md:px-6 mb-8 text-primary">
                <LayoutDashboard className="w-6 h-6 shrink-0" />
                <span className="hidden md:block font-bold tracking-wide">Overview</span>
              </div>
              <nav className="flex-1 flex flex-col gap-2 px-3 md:px-4 text-white/60">
                <NavItem icon={<Activity />} label="Real-time Analytics" active />
                <NavItem icon={<Layers />} label="System Operations" />
                <NavItem icon={<Grid />} label="Data Pipelines" />
                <NavItem icon={<Bell />} label="Alerts & Anomalies" badge="3" />
              </nav>
              <div className="mt-auto px-3 md:px-4 flex flex-col gap-2">
                <NavItem icon={<User />} label="Admin Profile" />
                <NavItem icon={<Settings />} label="Preferences" />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6">
              {/* Top KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardMetric title="Global Revenue" value="$4.2M" trend="+12%" />
                <DashboardMetric title="Ops Efficiency" value="98.2%" trend="+2.4%" />
                <DashboardMetric title="Active Nodes" value="1,248" trend="Stable" />
                <DashboardMetric title="Risk Level" value="Low" trend="-15%" isAlert={false} />
              </div>

              {/* Chart & Side Panel */}
              <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                
                {/* Main Chart */}
                <div className="flex-[2] border border-white/10 rounded-xl bg-white/5 p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-white/80">System Throughput vs Efficiency</h4>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">Live</span>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7B2FFF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7B2FFF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#060810', borderColor: 'rgba(255,255,255,0.1)' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#00D4FF" fillOpacity={1} fill="url(#colorRev)" />
                        <Area type="monotone" dataKey="efficiency" stroke="#7B2FFF" fillOpacity={1} fill="url(#colorEff)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="flex-1 border border-white/10 rounded-xl bg-white/5 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <h4 className="text-sm font-medium text-white">AI Recommendations</h4>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                    <RecommendationCard 
                      title="Reallocate Server Load" 
                      desc="Node cluster A is approaching capacity. Shift 20% traffic to cluster B."
                      impact="High"
                    />
                    <RecommendationCard 
                      title="Update Pricing Model" 
                      desc="Competitor price drop detected. Recommend matching tier 2 pricing."
                      impact="Medium"
                    />
                    <RecommendationCard 
                      title="Supply Chain Alert" 
                      desc="Weather delay predicted for route 44. Reroute via path 12."
                      impact="Critical"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NavItem({ icon, label, active, badge }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 hover:text-white'}`}>
      <div className="w-5 h-5 shrink-0">{icon}</div>
      <span className="hidden md:block text-sm font-medium">{label}</span>
      {badge && <span className="hidden md:flex ml-auto bg-destructive text-white text-[10px] w-5 h-5 rounded-full items-center justify-center">{badge}</span>}
    </div>
  );
}

function DashboardMetric({ title, value, trend, isAlert }: any) {
  return (
    <div className="border border-white/10 rounded-xl bg-white/5 p-4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-xs text-white/50 mb-2 font-mono uppercase tracking-wider">{title}</div>
      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{value}</div>
      <div className={`text-xs ${isAlert ? 'text-destructive' : 'text-primary'}`}>{trend} from last period</div>
    </div>
  );
}

function RecommendationCard({ title, desc, impact }: any) {
  return (
    <div className="p-3 rounded-lg border border-white/5 bg-black/40 hover:border-primary/30 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-1">
        <h5 className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors">{title}</h5>
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
          impact === 'Critical' ? 'bg-destructive/20 text-destructive' : 
          impact === 'High' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
        }`}>{impact}</span>
      </div>
      <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
