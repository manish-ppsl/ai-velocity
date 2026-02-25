// Mock data for the entire platform
export const mockKPIs = {
  totalPRs: 12847,
  aiGeneratedPRs: 4923,
  aiContributionPct: 38.3,
  avgMergeTime: 2.4,
  engineeringProductivityIndex: 87.2,
  aiEngineerEquivalents: 14.7,
  totalEntities: 8,
  activeDevs: 342,
  weeklyGrowth: 12.4,
  qualityScore: 94.1,
  costSavings: 2.3, // millions
  licenseUtilization: 78.5,
};

export const mockCorrelationData = [
  { week: 'W1', bitbucketPRs: 120, aiLines: 3400, aiPct: 22 },
  { week: 'W2', bitbucketPRs: 135, aiLines: 4100, aiPct: 25 },
  { week: 'W3', bitbucketPRs: 128, aiLines: 4800, aiPct: 28 },
  { week: 'W4', bitbucketPRs: 142, aiLines: 5200, aiPct: 31 },
  { week: 'W5', bitbucketPRs: 156, aiLines: 6100, aiPct: 33 },
  { week: 'W6', bitbucketPRs: 148, aiLines: 6800, aiPct: 35 },
  { week: 'W7', bitbucketPRs: 167, aiLines: 7500, aiPct: 37 },
  { week: 'W8', bitbucketPRs: 175, aiLines: 8200, aiPct: 38 },
  { week: 'W9', bitbucketPRs: 182, aiLines: 8900, aiPct: 40 },
  { week: 'W10', bitbucketPRs: 191, aiLines: 9600, aiPct: 42 },
  { week: 'W11', bitbucketPRs: 198, aiLines: 10200, aiPct: 44 },
  { week: 'W12', bitbucketPRs: 210, aiLines: 11000, aiPct: 46 },
];

export const mockToolUsage = [
  { tool: 'Cursor', usage: 45, prs: 2215, tokens: 1240000, cost: 12400, roi: 3.2 },
  { tool: 'Kiro', usage: 28, prs: 1378, tokens: 890000, cost: 8900, roi: 2.8 },
  { tool: 'Antigravity', usage: 18, prs: 886, tokens: 560000, cost: 5600, roi: 4.1 },
  { tool: 'Others', usage: 9, prs: 444, tokens: 210000, cost: 2100, roi: 1.9 },
];

export const mockHeatmapData = [
  { entity: 'Platform', mon: 82, tue: 78, wed: 91, thu: 85, fri: 72 },
  { entity: 'Payments', mon: 65, tue: 71, wed: 68, thu: 74, fri: 60 },
  { entity: 'Mobile', mon: 45, tue: 52, wed: 58, thu: 55, fri: 48 },
  { entity: 'Data', mon: 88, tue: 92, wed: 85, thu: 90, fri: 83 },
  { entity: 'Infra', mon: 72, tue: 68, wed: 75, thu: 70, fri: 65 },
  { entity: 'Frontend', mon: 55, tue: 60, wed: 63, thu: 58, fri: 50 },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  entity: string;
  team: string;
  aiContribution: number;
  aiAdoption: number;
  productivityIndex: number;
  qualityScore: number;
  level: number;
  levelName: string;
  streak: number;
  badges: string[];
  rankChange: number;
  tool: string;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Chen', avatar: 'SC', entity: 'Platform', team: 'Core API', aiContribution: 72, aiAdoption: 95, productivityIndex: 96, qualityScore: 98, level: 6, levelName: 'AI Master Engineer', streak: 14, badges: ['🏆', '⚡', '🛡️'], rankChange: 2, tool: 'Cursor' },
  { rank: 2, name: 'Marcus Rodriguez', avatar: 'MR', entity: 'Data', team: 'Pipeline', aiContribution: 68, aiAdoption: 92, productivityIndex: 94, qualityScore: 96, level: 5, levelName: 'AI Architect', streak: 11, badges: ['🏆', '🔥'], rankChange: 0, tool: 'Kiro' },
  { rank: 3, name: 'Aisha Patel', avatar: 'AP', entity: 'Platform', team: 'Auth', aiContribution: 65, aiAdoption: 88, productivityIndex: 91, qualityScore: 97, level: 5, levelName: 'AI Architect', streak: 9, badges: ['⚡', '🛡️'], rankChange: 1, tool: 'Cursor' },
  { rank: 4, name: 'James Liu', avatar: 'JL', entity: 'Payments', team: 'Checkout', aiContribution: 61, aiAdoption: 85, productivityIndex: 89, qualityScore: 93, level: 4, levelName: 'AI Optimizer', streak: 7, badges: ['🔥'], rankChange: -1, tool: 'Antigravity' },
  { rank: 5, name: 'Elena Kowalski', avatar: 'EK', entity: 'Mobile', team: 'iOS', aiContribution: 58, aiAdoption: 82, productivityIndex: 87, qualityScore: 95, level: 4, levelName: 'AI Optimizer', streak: 12, badges: ['⚡', '🎯'], rankChange: 3, tool: 'Cursor' },
  { rank: 6, name: 'David Kim', avatar: 'DK', entity: 'Infra', team: 'DevOps', aiContribution: 55, aiAdoption: 79, productivityIndex: 85, qualityScore: 91, level: 3, levelName: 'AI Accelerator', streak: 5, badges: ['🔥'], rankChange: 0, tool: 'Kiro' },
  { rank: 7, name: 'Priya Sharma', avatar: 'PS', entity: 'Frontend', team: 'Design System', aiContribution: 52, aiAdoption: 76, productivityIndex: 83, qualityScore: 94, level: 3, levelName: 'AI Accelerator', streak: 8, badges: ['🛡️'], rankChange: -2, tool: 'Cursor' },
  { rank: 8, name: 'Tom Anderson', avatar: 'TA', entity: 'Data', team: 'ML Ops', aiContribution: 49, aiAdoption: 73, productivityIndex: 81, qualityScore: 90, level: 3, levelName: 'AI Accelerator', streak: 4, badges: ['🎯'], rankChange: 1, tool: 'Antigravity' },
];

export const mockEntityLeaderboard = [
  { rank: 1, name: 'Platform Engineering', aiScore: 88, growth: 15.2, roi: 3.8, devs: 64, rankChange: 0 },
  { rank: 2, name: 'Data Engineering', aiScore: 85, growth: 18.1, roi: 3.5, devs: 48, rankChange: 1 },
  { rank: 3, name: 'Payments', aiScore: 72, growth: 12.4, roi: 2.9, devs: 52, rankChange: -1 },
  { rank: 4, name: 'Infrastructure', aiScore: 68, growth: 8.7, roi: 2.4, devs: 38, rankChange: 0 },
  { rank: 5, name: 'Mobile', aiScore: 55, growth: 22.3, roi: 2.1, devs: 45, rankChange: 2 },
  { rank: 6, name: 'Frontend', aiScore: 51, growth: 14.8, roi: 1.8, devs: 42, rankChange: -1 },
];

export const mockBadges = [
  { id: 1, name: 'First AI PR', icon: '🚀', description: 'Merged your first AI-assisted PR', earned: true },
  { id: 2, name: '50 AI PRs', icon: '⚡', description: '50 AI-assisted PRs merged', earned: true },
  { id: 3, name: 'Zero-Revert Streak', icon: '🛡️', description: '30 days with no AI PR reverts', earned: true },
  { id: 4, name: 'Multi-Tool Champion', icon: '🏆', description: 'Used 3+ AI tools effectively', earned: true },
  { id: 5, name: 'Quality Guardian', icon: '🎯', description: '95%+ quality score for 60 days', earned: false },
  { id: 6, name: 'AI Pioneer', icon: '🌟', description: 'Top 5% AI adoption in org', earned: false },
  { id: 7, name: 'Speed Demon', icon: '🔥', description: 'Fastest merge time 10 weeks in a row', earned: true },
  { id: 8, name: 'Collaboration King', icon: '🤝', description: 'Reviewed 100+ AI PRs', earned: false },
];

export const mockLevels = [
  { level: 1, name: 'AI Explorer', minScore: 0, color: 'muted' },
  { level: 2, name: 'AI Contributor', minScore: 20, color: 'accent' },
  { level: 3, name: 'AI Accelerator', minScore: 40, color: 'primary' },
  { level: 4, name: 'AI Optimizer', minScore: 60, color: 'warning' },
  { level: 5, name: 'AI Architect', minScore: 80, color: 'purple' },
  { level: 6, name: 'AI Master Engineer', minScore: 95, color: 'rose' },
];

export const mockAgents = [
  { id: 'productivity', name: 'Productivity Analyst', icon: '📊', status: 'active', lastInsight: 'Platform team AI velocity increased 23% this sprint' },
  { id: 'quality', name: 'Quality Risk Agent', icon: '🛡️', status: 'active', lastInsight: 'Payments team showing 8% revert rate on AI PRs — above threshold' },
  { id: 'optimization', name: 'Tool Optimizer', icon: '⚙️', status: 'active', lastInsight: 'Cursor outperforms Kiro by 18% ROI for Frontend team' },
  { id: 'license', name: 'License Optimizer', icon: '💰', status: 'warning', lastInsight: '12 idle Kiro licenses detected in Mobile entity' },
  { id: 'forecast', name: 'Growth Forecaster', icon: '📈', status: 'active', lastInsight: 'Projected 52% AI contribution by Q3 at current growth rate' },
];
