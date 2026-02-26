import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Trophy, Flame, Shield, GitPullRequest, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeaderboardEntry, TeamLeaderboardEntry, RepoLeaderboardEntry, mockLevels } from "@/lib/mock-data";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

// Generate fake historical data
function generateWeeklyTrend(base: number, weeks = 12, variance = 8) {
  return Array.from({ length: weeks }, (_, i) => ({
    week: `W${i + 1}`,
    value: Math.max(0, Math.min(100, base - variance + Math.round(Math.random() * variance * 2) + (i * variance / weeks))),
  }));
}

function generatePRHistory(base: number, weeks = 12) {
  return Array.from({ length: weeks }, (_, i) => ({
    week: `W${i + 1}`,
    total: Math.round(base * (0.7 + Math.random() * 0.6)),
    ai: Math.round(base * (0.3 + Math.random() * 0.4)),
  }));
}

const chartTooltipStyle = {
  contentStyle: { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 11 },
  labelStyle: { color: 'hsl(var(--muted-foreground))' },
};

interface DrillDownPanelProps {
  type: 'developer' | 'entity' | 'team' | 'repo';
  data: any;
  onClose: () => void;
}

function StatBox({ label, value, accent = false }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg bg-secondary/30 text-center">
      <div className={cn("font-mono text-lg font-bold", accent ? "text-primary" : "text-foreground")}>{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function DeveloperDetail({ data }: { data: LeaderboardEntry }) {
  const aiTrend = generateWeeklyTrend(data.aiContribution);
  const prHistory = generatePRHistory(18);
  const qualityTrend = generateWeeklyTrend(data.qualityScore, 12, 4);
  const level = mockLevels.find(l => l.level === data.level);

  const radarData = [
    { metric: 'AI Adopt', value: data.aiAdoption },
    { metric: 'Quality', value: data.qualityScore },
    { metric: 'Velocity', value: data.productivityIndex },
    { metric: 'Streak', value: Math.min(100, data.streak) },
    { metric: 'Collab', value: 70 + Math.round(Math.random() * 25) },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-xl font-bold text-primary">{data.avatar}</div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{data.name}</h2>
          <p className="text-sm text-muted-foreground">{data.entity} · {data.team}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary">L{data.level} {data.levelName}</span>
            <span className="text-[10px] font-mono text-muted-foreground">🔥 {data.streak}d streak</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3">
        <StatBox label="AI Contrib" value={`${data.aiContribution}%`} accent />
        <StatBox label="Productivity" value={data.productivityIndex} />
        <StatBox label="Quality" value={`${data.qualityScore}%`} />
        <StatBox label="Primary Tool" value={data.tool} />
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-2">BADGES</h3>
        <div className="flex gap-2">{data.badges.map((b, i) => <span key={i} className="text-2xl">{b}</span>)}</div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">AI CONTRIBUTION TREND</h3>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={aiTrend}>
              <defs><linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#aiGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">PR HISTORY</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={prHistory}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="total" fill="hsl(var(--secondary))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ai" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">QUALITY TREND</h3>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={qualityTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={[80, 100]} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">SKILL RADAR</h3>
          <ResponsiveContainer width="100%" height={140}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Level Progress */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3">LEVEL PROGRESSION</h3>
        <div className="flex items-center gap-1">
          {mockLevels.map(l => (
            <div key={l.level} className={cn("flex-1 h-2 rounded-full", l.level <= data.level ? "bg-primary" : "bg-secondary/50")} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-muted-foreground">L1 Explorer</span>
          <span className="text-[9px] text-primary font-mono">L{data.level} {data.levelName}</span>
          <span className="text-[9px] text-muted-foreground">L10 Expert</span>
        </div>
      </div>
    </div>
  );
}

function EntityDetail({ data }: { data: any }) {
  const growthTrend = generateWeeklyTrend(data.aiScore);
  const roiTrend = generateWeeklyTrend(Math.round(data.roi * 25), 12, 5);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">{data.name}</h2>
        <p className="text-sm text-muted-foreground">{data.devs} developers · Rank #{data.rank}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="AI Score" value={data.aiScore} accent />
        <StatBox label="Growth" value={`+${data.growth}%`} />
        <StatBox label="ROI" value={`${data.roi}x`} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">AI SCORE TREND</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={growthTrend}>
              <defs><linearGradient id="entGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#entGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">ROI TREND</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={roiTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function TeamDetail({ data }: { data: TeamLeaderboardEntry }) {
  const velocityTrend = generateWeeklyTrend(data.prVelocity > 100 ? 75 : 55);
  const mergeTrend = generateWeeklyTrend(data.aiMergeRate, 12, 5);
  const radarData = [
    { metric: 'Velocity', value: Math.min(100, data.prVelocity) },
    { metric: 'AI Merge', value: data.aiMergeRate },
    { metric: 'Tools', value: data.toolDiversity * 33 },
    { metric: 'Maturity', value: data.maturityScore },
    { metric: 'Size', value: Math.min(100, data.devs * 5) },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">{data.team}</h2>
        <p className="text-sm text-muted-foreground">{data.entity} · {data.devs} developers · Rank #{data.rank}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <StatBox label="PR Velocity" value={data.prVelocity} accent />
        <StatBox label="AI Merge Rate" value={`${data.aiMergeRate}%`} />
        <StatBox label="Tool Diversity" value={data.toolDiversity} />
        <StatBox label="Maturity" value={data.maturityScore} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">VELOCITY TREND</h3>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={velocityTrend}>
              <defs><linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#velGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">TEAM RADAR</h3>
          <ResponsiveContainer width="100%" height={140}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3">AI MERGE RATE TREND</h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={mergeTrend}>
            <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={[60, 100]} />
            <Tooltip {...chartTooltipStyle} />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RepoDetail({ data }: { data: RepoLeaderboardEntry }) {
  const prTrend = generatePRHistory(Math.round(data.totalPRs / 12));
  const mergeSpeedTrend = generateWeeklyTrend(Math.round(100 - data.aiPRMergeSpeed * 15), 12, 6);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground font-mono">{data.repo}</h2>
          {data.sensitiveExposure && <Shield className="w-4 h-4 text-glow-warning" />}
        </div>
        <p className="text-sm text-muted-foreground">{data.entity} · {data.team} · Rank #{data.rank}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <StatBox label="Total PRs" value={data.totalPRs} />
        <StatBox label="AI PRs" value={data.aiPRs} accent />
        <StatBox label="AI %" value={`${Math.round(data.aiPRs / data.totalPRs * 100)}%`} />
        <StatBox label="Merge Speed" value={`${data.aiPRMergeSpeed}h`} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">PR BREAKDOWN (WEEKLY)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={prTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="total" fill="hsl(var(--secondary))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ai" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">MERGE SPEED TREND</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={mergeSpeedTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {data.sensitiveExposure && (
        <div className="p-3 rounded-lg bg-glow-warning/10 border border-glow-warning/20 flex items-center gap-2">
          <Shield className="w-4 h-4 text-glow-warning" />
          <span className="text-xs text-glow-warning">This repository contains sensitive modules with AI-generated code exposure.</span>
        </div>
      )}
    </div>
  );
}

export function DrillDownPanel({ type, data, onClose }: DrillDownPanelProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="absolute right-0 top-0 h-full w-full max-w-3xl bg-card border-l border-border overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {type} detail
            </span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="p-6">
            {type === 'developer' && <DeveloperDetail data={data} />}
            {type === 'entity' && <EntityDetail data={data} />}
            {type === 'team' && <TeamDetail data={data} />}
            {type === 'repo' && <RepoDetail data={data} />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
