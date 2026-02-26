import { AppLayout } from "@/components/AppLayout";
import { mockPRVelocityTrend, mockEntityComparison, mockCorrelationData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";

const Analytics = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          </div>
          <p className="text-sm text-muted-foreground">Deep-dive into PR velocity, AI trends, and entity comparison</p>
        </motion.div>

        {/* PR Velocity Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">PR Velocity & AI PRs Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPRVelocityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={11} />
                <YAxis stroke="hsl(215 20% 55%)" fontSize={11} />
                <Tooltip contentStyle={{ background: 'hsl(222 41% 10%)', border: '1px solid hsl(222 30% 18%)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="velocity" fill="hsl(189 100% 50% / 0.3)" name="Total PRs" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aiPRs" fill="hsl(165 80% 45%)" name="AI PRs" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Contribution Growth */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">AI Contribution % Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockCorrelationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                  <XAxis dataKey="week" stroke="hsl(215 20% 55%)" fontSize={11} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={11} />
                  <Tooltip contentStyle={{ background: 'hsl(222 41% 10%)', border: '1px solid hsl(222 30% 18%)', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="aiPct" stroke="hsl(189 100% 50%)" strokeWidth={2} dot={{ r: 3 }} name="AI %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Entity Comparison Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Entity Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockEntityComparison.slice(0, 6)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                  <XAxis type="number" stroke="hsl(215 20% 55%)" fontSize={11} />
                  <YAxis type="category" dataKey="entity" stroke="hsl(215 20% 55%)" fontSize={10} width={100} />
                  <Tooltip contentStyle={{ background: 'hsl(222 41% 10%)', border: '1px solid hsl(222 30% 18%)', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend />
                  <Bar dataKey="aiAdoption" fill="hsl(189 100% 50%)" name="AI Adoption" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="quality" fill="hsl(165 80% 45%)" name="Quality" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
