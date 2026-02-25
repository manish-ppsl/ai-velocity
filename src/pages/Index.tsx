import { KPICard } from "@/components/dashboard/KPICard";
import { CorrelationChart } from "@/components/dashboard/CorrelationChart";
import { AIAdoptionHeatmap } from "@/components/dashboard/AIAdoptionHeatmap";
import { ToolBreakdown } from "@/components/dashboard/ToolBreakdown";
import { EPIGauge } from "@/components/dashboard/EPIGauge";
import { mockKPIs } from "@/lib/mock-data";
import { AppLayout } from "@/components/AppLayout";
import { GitPullRequest, Bot, Users, TrendingUp, DollarSign, Gauge, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Executive Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">AI Engineering Productivity Overview</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">Live • Last sync 4m ago</span>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Total PRs" value={mockKPIs.totalPRs.toLocaleString()} icon={GitPullRequest} trend={mockKPIs.weeklyGrowth} variant="default" />
          <KPICard title="AI Contribution" value={`${mockKPIs.aiContributionPct}%`} icon={Bot} trend={5.2} variant="primary" subtitle={`${mockKPIs.aiGeneratedPRs.toLocaleString()} AI PRs`} />
          <KPICard title="AI Engineer Equiv." value={mockKPIs.aiEngineerEquivalents.toString()} icon={Users} trend={2.1} variant="accent" />
          <KPICard title="Quality Score" value={`${mockKPIs.qualityScore}%`} icon={Shield} variant="default" />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Avg Merge Time" value={`${mockKPIs.avgMergeTime}h`} icon={Zap} trend={-8.3} variant="default" />
          <KPICard title="Active Developers" value={mockKPIs.activeDevs.toString()} icon={Users} variant="default" />
          <KPICard title="Cost Savings" value={`$${mockKPIs.costSavings}M`} icon={DollarSign} trend={18.7} variant="accent" />
          <KPICard title="License Utilization" value={`${mockKPIs.licenseUtilization}%`} icon={Gauge} variant="default" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CorrelationChart />
          </div>
          <EPIGauge value={mockKPIs.engineeringProductivityIndex} />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIAdoptionHeatmap />
          <ToolBreakdown />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
