import { AppLayout } from "@/components/AppLayout";
import { mockLeaderboard, mockBadges, mockLevels } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Flame, Target, Award, Zap } from "lucide-react";
import { useState } from "react";

const user = mockLeaderboard[0];
const badgeCategories = ['All', 'PR', 'Streak', 'Quality', 'Tool', 'Team', 'Speed'] as const;

const Gamification = () => {
  const [category, setCategory] = useState<string>('All');
  const filtered = category === 'All' ? mockBadges : mockBadges.filter(b => b.category === category);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Gamification Profile</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your AI engineering journey & achievements</p>
        </motion.div>

        {/* Profile hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-glow rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary animate-float">{user.avatar}</div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.entity} · {user.team}</p>
              <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-glow-rose/15 text-glow-rose text-xs font-mono">L{user.level} — {user.levelName}</span>
                <span className="text-sm text-glow-warning flex items-center gap-1"><Flame className="w-4 h-4" /> {user.streak} day streak</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div><div className="font-mono text-2xl font-bold gradient-text">{user.aiContribution}%</div><div className="text-[10px] text-muted-foreground">AI Contribution</div></div>
              <div><div className="font-mono text-2xl font-bold text-foreground">{user.productivityIndex}</div><div className="text-[10px] text-muted-foreground">Productivity</div></div>
              <div><div className="font-mono text-2xl font-bold text-foreground">{user.qualityScore}%</div><div className="text-[10px] text-muted-foreground">Quality</div></div>
            </div>
          </div>
        </motion.div>

        {/* Level Progression — 10 levels */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Level Progression</h3>
          <div className="flex items-center gap-1">
            {mockLevels.map((lvl) => {
              const isActive = lvl.level <= user.level;
              const isCurrent = lvl.level === user.level;
              const colorMap: Record<string, string> = { muted: "bg-muted-foreground", accent: "bg-accent", primary: "bg-primary", warning: "bg-glow-warning", purple: "bg-glow-purple", rose: "bg-glow-rose" };
              return (
                <div key={lvl.level} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className={cn("w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-mono text-[10px] lg:text-xs font-bold transition-all",
                    isActive ? `${colorMap[lvl.color]}/20 text-foreground` : "bg-secondary text-muted-foreground/40",
                    isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background")}>{lvl.level}</div>
                  <span className={cn("text-[8px] lg:text-[9px] text-center leading-tight", isActive ? "text-muted-foreground" : "text-muted-foreground/40")}>{lvl.name}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(user.level / 10) * 100}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground text-right font-mono">Level {user.level}/10 · {user.levelName}</div>
        </motion.div>

        {/* Badges with category filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-glow-warning" /> Badges & Achievements</h3>
          <div className="flex gap-1 mb-4 flex-wrap">
            {badgeCategories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={cn("px-3 py-1 text-[10px] font-medium rounded-full transition-all",
                  category === c ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground bg-secondary/50")}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((badge, i) => (
              <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.03 * i }}
                className={cn("rounded-xl p-4 text-center transition-all",
                  badge.earned ? "glass-card-glow hover:scale-105 cursor-pointer" : "bg-secondary/30 opacity-40")}>
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs font-semibold text-foreground">{badge.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{badge.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Streaks (in days) & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Flame className="w-4 h-4 text-glow-warning" /> Active Streaks</h3>
            <div className="space-y-3">
              {[
                { name: "Daily AI PR", current: 98, best: 98, unit: "days" },
                { name: "Merge without rewrite", current: 56, best: 72, unit: "days" },
                { name: "High-quality AI", current: 42, best: 63, unit: "days" },
                { name: "Zero-revert streak", current: 35, best: 45, unit: "days" },
                { name: "Multi-tool usage", current: 21, best: 28, unit: "days" },
              ].map((streak) => (
                <div key={streak.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <div className="text-xs font-medium text-foreground">{streak.name}</div>
                    <div className="text-[10px] text-muted-foreground">Best: {streak.best} {streak.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-bold text-glow-warning">{streak.current}</div>
                    <div className="text-[10px] text-muted-foreground">{streak.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Active Challenges</h3>
            <div className="space-y-3">
              {[
                { name: "AI Adoption Sprint", type: "Paytm vs OCL", progress: 72, end: "5 days left" },
                { name: "Quality-First AI", type: "Individual", progress: 88, end: "12 days left" },
                { name: "Multi-Tool Explorer", type: "Team", progress: 45, end: "3 weeks left" },
                { name: "30-Day PR Marathon", type: "All Entities", progress: 63, end: "18 days left" },
              ].map((challenge) => (
                <div key={challenge.name} className="p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-xs font-medium text-foreground">{challenge.name}</div>
                      <div className="text-[10px] text-muted-foreground">{challenge.type} · {challenge.end}</div>
                    </div>
                    <span className="font-mono text-xs text-primary">{challenge.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${challenge.progress}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Gamification;
