import { AppLayout } from "@/components/AppLayout";
import { mockTeams, entities } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, Filter } from "lucide-react";
import { useState } from "react";

const Teams = () => {
  const [entityFilter, setEntityFilter] = useState<string>('All');
  const filtered = entityFilter === 'All' ? mockTeams : mockTeams.filter(t => t.entity === entityFilter);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Teams</h1>
          </div>
          <p className="text-sm text-muted-foreground">Team overview across all entities</p>
        </motion.div>

        {/* Entity filter */}
        <div className="flex gap-1 flex-wrap">
          {['All', ...entities].map(e => (
            <button key={e} onClick={() => setEntityFilter(e)}
              className={cn("px-3 py-1.5 text-[10px] font-medium rounded-full transition-all",
                entityFilter === e ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground bg-secondary/50")}>
              {e}
            </button>
          ))}
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((team, i) => (
            <motion.div key={`${team.entity}-${team.name}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{team.name}</div>
                  <div className="text-[10px] text-muted-foreground">{team.entity} · {team.devs} developers</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary">L{team.avgLevel}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-2 rounded-lg bg-secondary/30 text-center">
                  <div className="font-mono text-sm font-semibold text-primary">{team.aiAdoption}%</div>
                  <div className="text-[9px] text-muted-foreground">AI Adoption</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary/30 text-center">
                  <div className="font-mono text-sm font-semibold text-accent">{team.prVelocity}</div>
                  <div className="text-[9px] text-muted-foreground">PR Velocity</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary/30 text-center">
                  <div className="font-mono text-sm font-semibold text-foreground">{team.qualityScore}%</div>
                  <div className="text-[9px] text-muted-foreground">Quality</div>
                </div>
                <div className="p-2 rounded-lg bg-secondary/30 text-center">
                  <div className="font-mono text-sm font-semibold text-glow-warning">{team.topTool}</div>
                  <div className="text-[9px] text-muted-foreground">Top Tool</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Lead: {team.lead}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Teams;
