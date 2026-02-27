import { KPICard } from "@/components/dashboard/KPICard";
import { CorrelationChart } from "@/components/dashboard/CorrelationChart";
import { AIAdoptionHeatmap } from "@/components/dashboard/AIAdoptionHeatmap";
import { ToolBreakdown } from "@/components/dashboard/ToolBreakdown";
import { EPIGauge } from "@/components/dashboard/EPIGauge";
import { DurationFilter } from "@/components/DurationFilter";
import { mockKPIs } from "@/lib/mock-data";
import { useProductivityData, useUsageData, useSpendData, useAiTools, type Period } from "@/hooks/useToolData";
import { AppLayout } from "@/components/AppLayout";
import { GitPullRequest, Bot, Users, TrendingUp, DollarSign, Gauge, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>('30d');
  const { data: tools } = useAiTools();
  const { data: productivityData } = useProductivityData(null, period);
  const { data: usageData } = useUsageData(null, period);
  const { data: spendData } = useSpendData(null, period);

  // Derive KPIs from DB data, fallback to mock
  const kpis = useMemo(() => {
    if (!productivityData?.length) return mockKPIs;

    const totalLinesAdded = productivityData.reduce((s, r) => s + (r.lines_added || 0), 0);
    const totalLinesDeleted = productivityData.reduce((s, r) => s + (r.lines_deleted || 0), 0);
    const totalTabCompletions = productivityData.reduce((s, r) => s + (r.tab_completions || 0), 0);
    const totalComposerReqs = productivityData.reduce((s, r) => s + (r.composer_requests || 0), 0);
    const totalChatReqs = productivityData.reduce((s, r) => s + (r.chat_requests || 0), 0);
    const totalAiCommits = productivityData.reduce((s, r) => s + (r.ai_attributed_commits || 0), 0);
    const avgAcceptance = productivityData.filter(r => r.suggestion_acceptance_rate).reduce((s, r, _, a) => s + (r.suggestion_acceptance_rate || 0) / a.length, 0);
    const latestDau = productivityData[productivityData.length - 1]?.active_users_dau || mockKPIs.activeDevs;

    const totalSpendCents = spendData?.reduce((s, r) => s + (r.spend_cents || 0), 0) || 0;
    const totalTokens = usageData?.reduce((s, r) => s + (r.input_tokens || 0) + (r.output_tokens || 0), 0) || 0;

    return {
      ...mockKPIs,
      activeDevs: latestDau,
      aiContributionPct: avgAcceptance > 0 ? Math.round(avgAcceptance) : mockKPIs.aiContributionPct,
      aiGeneratedPRs: totalAiCommits || mockKPIs.aiGeneratedPRs,
      costSavings: totalSpendCents > 0 ? (totalSpendCents / 100000).toFixed(1) : mockKPIs.costSavings,
    };
  }, [productivityData, usageData, spendData]);

  const enabledToolCount = tools?.filter((t: any) => t.enabled).length || 0;
  const lastSync = tools?.[0]?.tool_integrations?.[0]?.last_sync_at;

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
          <div className="flex items-center gap-4">
            <DurationFilter value={period} onChange={setPeriod} />
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${enabledToolCount > 0 ? 'bg-accent animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-xs font-mono text-muted-foreground">
                {lastSync ? `Last sync ${new Date(lastSync).toLocaleString()}` : `${enabledToolCount} tools connected`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Total PRs" value={kpis.totalPRs.toLocaleString()} icon={GitPullRequest} trend={kpis.weeklyGrowth} variant="default" />
          <KPICard title="AI Contribution" value={`${kpis.aiContributionPct}%`} icon={Bot} trend={5.2} variant="primary" subtitle={`${kpis.aiGeneratedPRs.toLocaleString()} AI PRs`} />
          <KPICard title="AI Engineer Equiv." value={kpis.aiEngineerEquivalents.toString()} icon={Users} trend={2.1} variant="accent" />
          <KPICard title="Quality Score" value={`${kpis.qualityScore}%`} icon={Shield} variant="default" />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Avg Merge Time" value={`${kpis.avgMergeTime}h`} icon={Zap} trend={-8.3} variant="default" />
          <KPICard title="Active Developers" value={kpis.activeDevs.toString()} icon={Users} variant="default" />
          <KPICard title="Cost Savings" value={`$${kpis.costSavings}M`} icon={DollarSign} trend={18.7} variant="accent" />
          <KPICard title="License Utilization" value={`${kpis.licenseUtilization}%`} icon={Gauge} variant="default" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CorrelationChart />
          </div>
          <EPIGauge value={kpis.engineeringProductivityIndex} />
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
