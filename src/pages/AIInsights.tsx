import { AppLayout } from "@/components/AppLayout";
import { mockAgents } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const AIInsights = () => {
  const [query, setQuery] = useState("");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Bot className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          </div>
          <p className="text-sm text-muted-foreground">Multi-agent intelligence for engineering decisions</p>
        </motion.div>

        {/* Query bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-glow rounded-xl p-1"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything... e.g. 'Which entity improved AI contribution but reduced quality?'"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
            />
            <button className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{agent.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{agent.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      agent.status === "active" ? "bg-accent" : "bg-glow-warning"
                    )} />
                    <span className="text-[10px] text-muted-foreground capitalize">{agent.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-secondary/30">
                <span className="text-primary font-mono text-[10px]">Latest insight: </span>
                {agent.lastInsight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sample conversation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Insights</h3>
          <div className="space-y-4">
            {[
              { agent: "📊 Productivity Analyst", text: "Platform team's AI velocity has increased 23% this sprint, driven by Cursor adoption in the Core API team. Recommend expanding Cursor licenses to Auth team." },
              { agent: "🛡️ Quality Risk Agent", text: "Payments team showing 8% revert rate on AI PRs — above the 5% threshold. Suggest code review policy update for AI-generated changes in payment-critical paths." },
              { agent: "💰 License Optimizer", text: "12 idle Kiro licenses detected in Mobile entity. Projected savings of $2,400/month if reallocated to Data Engineering team." },
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/20">
                <span className="text-sm shrink-0">{insight.agent.split(' ')[0]}</span>
                <div>
                  <div className="text-[10px] font-mono text-primary mb-1">{insight.agent}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{insight.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default AIInsights;
