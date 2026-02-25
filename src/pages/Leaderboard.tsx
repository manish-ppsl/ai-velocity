import { AppLayout } from "@/components/AppLayout";
import { mockLeaderboard, mockEntityLeaderboard, LeaderboardEntry } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";

const tabs = ["Developers", "Entities", "Teams", "Repositories"] as const;

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <div className="w-8 h-8 rounded-full bg-glow-warning/20 flex items-center justify-center text-glow-warning font-mono font-bold text-sm">1</div>;
  if (rank === 2) return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-mono font-bold text-sm">2</div>;
  if (rank === 3) return <div className="w-8 h-8 rounded-full bg-glow-warning/10 flex items-center justify-center text-glow-warning/70 font-mono font-bold text-sm">3</div>;
  return <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground font-mono text-sm">{rank}</div>;
}

function RankChange({ change }: { change: number }) {
  if (change > 0) return <span className="flex items-center gap-0.5 text-[10px] font-mono text-accent"><TrendingUp className="w-3 h-3" />+{change}</span>;
  if (change < 0) return <span className="flex items-center gap-0.5 text-[10px] font-mono text-destructive"><TrendingDown className="w-3 h-3" />{change}</span>;
  return <span className="flex items-center text-[10px] text-muted-foreground"><Minus className="w-3 h-3" /></span>;
}

function LevelPill({ level, name }: { level: number; name: string }) {
  const colors: Record<number, string> = {
    1: "bg-muted text-muted-foreground",
    2: "bg-accent/15 text-accent",
    3: "bg-primary/15 text-primary",
    4: "bg-glow-warning/15 text-glow-warning",
    5: "bg-glow-purple/15 text-glow-purple",
    6: "bg-glow-rose/15 text-glow-rose",
  };
  return (
    <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full", colors[level] || colors[1])}>
      L{level} {name}
    </span>
  );
}

function DeveloperRow({ entry, index }: { entry: LeaderboardEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-secondary/30 cursor-pointer",
        index === 0 && "glass-card-glow"
      )}
    >
      <RankBadge rank={entry.rank} />
      <RankChange change={entry.rankChange} />

      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {entry.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{entry.name}</span>
          <span className="text-[10px] text-muted-foreground">{entry.badges.join(' ')}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-muted-foreground">{entry.entity} · {entry.team}</span>
          <LevelPill level={entry.level} name={entry.levelName} />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-sm font-mono font-semibold text-primary">{entry.aiContribution}%</div>
          <div className="text-[10px] text-muted-foreground">AI Contrib</div>
        </div>
        <div>
          <div className="text-sm font-mono font-semibold text-foreground">{entry.productivityIndex}</div>
          <div className="text-[10px] text-muted-foreground">Productivity</div>
        </div>
        <div>
          <div className="text-sm font-mono font-semibold text-foreground">{entry.qualityScore}%</div>
          <div className="text-[10px] text-muted-foreground">Quality</div>
        </div>
        <div>
          <div className="text-sm font-mono font-semibold text-glow-warning">🔥 {entry.streak}</div>
          <div className="text-[10px] text-muted-foreground">Streak</div>
        </div>
      </div>
    </motion.div>
  );
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Developers");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="w-6 h-6 text-glow-warning" />
            <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">Ranked by AI productivity, adoption, and quality scores</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-xs font-medium rounded-md transition-all",
                activeTab === tab
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {activeTab === "Developers" && (
          <>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[1, 0, 2].map((idx) => {
                const e = mockLeaderboard[idx];
                const isFirst = idx === 0;
                return (
                  <motion.div
                    key={e.rank}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-xl glass-card text-center",
                      isFirst && "glass-card-glow -mt-4 pb-6"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-2",
                      isFirst ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    )}>
                      {e.avatar}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{e.name}</div>
                    <div className="text-[10px] text-muted-foreground">{e.entity}</div>
                    <div className="font-mono text-xl font-bold gradient-text mt-2">{e.aiContribution}%</div>
                    <div className="text-[10px] text-muted-foreground">AI Contribution</div>
                    <div className="flex gap-1 mt-2">{e.badges.map((b, i) => <span key={i}>{b}</span>)}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="space-y-1">
              {mockLeaderboard.map((entry, i) => (
                <DeveloperRow key={entry.rank} entry={entry} index={i} />
              ))}
            </div>
          </>
        )}

        {activeTab === "Entities" && (
          <div className="space-y-1">
            {mockEntityLeaderboard.map((entity, i) => (
              <motion.div
                key={entity.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-secondary/30",
                  i === 0 && "glass-card-glow"
                )}
              >
                <RankBadge rank={entity.rank} />
                <RankChange change={entity.rankChange} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{entity.name}</div>
                  <div className="text-[10px] text-muted-foreground">{entity.devs} developers</div>
                </div>
                <div className="hidden md:grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-sm font-mono font-semibold text-primary">{entity.aiScore}</div>
                    <div className="text-[10px] text-muted-foreground">AI Score</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono font-semibold text-accent">+{entity.growth}%</div>
                    <div className="text-[10px] text-muted-foreground">Growth</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono font-semibold text-foreground">{entity.roi}x</div>
                    <div className="text-[10px] text-muted-foreground">ROI</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {(activeTab === "Teams" || activeTab === "Repositories") && (
          <div className="glass-card rounded-xl p-12 text-center">
            <p className="text-sm text-muted-foreground">Coming soon — {activeTab} leaderboard</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
