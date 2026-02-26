// Mock data for the entire platform

// Entities (Organizations)
export const entities = [
  'Paytm', 'PPSL', 'PML', 'OCL', 'Paytm Money', 'Paytm Insurance', 'Paytm Payments Bank', 'PayPay'
] as const;

export const teamTypes = [
  'Data', 'Platform', 'Product', 'Growth', 'Business', 'Analytics', 'App', 'DevOps', 'Security', 'QA'
] as const;

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
  costSavings: 2.3,
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
  { tool: 'Cursor', usage: 45, prs: 2215, tokens: 1240000, cost: 12400, roi: 3.2, licenses: 120, active: 98, idle: 22 },
  { tool: 'Kiro', usage: 28, prs: 1378, tokens: 890000, cost: 8900, roi: 2.8, licenses: 85, active: 64, idle: 21 },
  { tool: 'Antigravity', usage: 18, prs: 886, tokens: 560000, cost: 5600, roi: 4.1, licenses: 50, active: 44, idle: 6 },
  { tool: 'Others', usage: 9, prs: 444, tokens: 210000, cost: 2100, roi: 1.9, licenses: 30, active: 18, idle: 12 },
];

export const mockHeatmapData = [
  { entity: 'Paytm', mon: 82, tue: 78, wed: 91, thu: 85, fri: 72 },
  { entity: 'PPSL', mon: 65, tue: 71, wed: 68, thu: 74, fri: 60 },
  { entity: 'PML', mon: 45, tue: 52, wed: 58, thu: 55, fri: 48 },
  { entity: 'OCL', mon: 88, tue: 92, wed: 85, thu: 90, fri: 83 },
  { entity: 'Paytm Money', mon: 72, tue: 68, wed: 75, thu: 70, fri: 65 },
  { entity: 'PayPay', mon: 55, tue: 60, wed: 63, thu: 58, fri: 50 },
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
  streak: number; // in days
  badges: string[];
  rankChange: number;
  tool: string;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Chen', avatar: 'SC', entity: 'Paytm', team: 'Platform', aiContribution: 72, aiAdoption: 95, productivityIndex: 96, qualityScore: 98, level: 10, levelName: 'AI Expert', streak: 98, badges: ['🏆', '⚡', '🛡️', '💎'], rankChange: 2, tool: 'Cursor' },
  { rank: 2, name: 'Marcus Rodriguez', avatar: 'MR', entity: 'OCL', team: 'Data', aiContribution: 68, aiAdoption: 92, productivityIndex: 94, qualityScore: 96, level: 9, levelName: 'AI Virtuoso', streak: 77, badges: ['🏆', '🔥', '🌟'], rankChange: 0, tool: 'Kiro' },
  { rank: 3, name: 'Aisha Patel', avatar: 'AP', entity: 'Paytm', team: 'Product', aiContribution: 65, aiAdoption: 88, productivityIndex: 91, qualityScore: 97, level: 8, levelName: 'AI Maestro', streak: 63, badges: ['⚡', '🛡️'], rankChange: 1, tool: 'Cursor' },
  { rank: 4, name: 'James Liu', avatar: 'JL', entity: 'PPSL', team: 'App', aiContribution: 61, aiAdoption: 85, productivityIndex: 89, qualityScore: 93, level: 7, levelName: 'AI Architect', streak: 49, badges: ['🔥', '🎯'], rankChange: -1, tool: 'Antigravity' },
  { rank: 5, name: 'Elena Kowalski', avatar: 'EK', entity: 'PML', team: 'Growth', aiContribution: 58, aiAdoption: 82, productivityIndex: 87, qualityScore: 95, level: 7, levelName: 'AI Architect', streak: 84, badges: ['⚡', '🎯', '🤝'], rankChange: 3, tool: 'Cursor' },
  { rank: 6, name: 'David Kim', avatar: 'DK', entity: 'OCL', team: 'DevOps', aiContribution: 55, aiAdoption: 79, productivityIndex: 85, qualityScore: 91, level: 6, levelName: 'AI Master', streak: 35, badges: ['🔥'], rankChange: 0, tool: 'Kiro' },
  { rank: 7, name: 'Priya Sharma', avatar: 'PS', entity: 'Paytm Money', team: 'Analytics', aiContribution: 52, aiAdoption: 76, productivityIndex: 83, qualityScore: 94, level: 5, levelName: 'AI Optimizer', streak: 56, badges: ['🛡️', '🌟'], rankChange: -2, tool: 'Cursor' },
  { rank: 8, name: 'Tom Anderson', avatar: 'TA', entity: 'PPSL', team: 'Data', aiContribution: 49, aiAdoption: 73, productivityIndex: 81, qualityScore: 90, level: 4, levelName: 'AI Specialist', streak: 28, badges: ['🎯'], rankChange: 1, tool: 'Antigravity' },
  { rank: 9, name: 'Ravi Kumar', avatar: 'RK', entity: 'PayPay', team: 'Platform', aiContribution: 46, aiAdoption: 70, productivityIndex: 79, qualityScore: 89, level: 4, levelName: 'AI Specialist', streak: 21, badges: ['🔥', '🤝'], rankChange: -1, tool: 'Cursor' },
  { rank: 10, name: 'Lisa Wang', avatar: 'LW', entity: 'Paytm', team: 'Business', aiContribution: 43, aiAdoption: 67, productivityIndex: 77, qualityScore: 92, level: 3, levelName: 'AI Accelerator', streak: 14, badges: ['⚡'], rankChange: 2, tool: 'Kiro' },
  { rank: 11, name: 'Ahmed Hassan', avatar: 'AH', entity: 'PML', team: 'QA', aiContribution: 40, aiAdoption: 64, productivityIndex: 75, qualityScore: 88, level: 3, levelName: 'AI Accelerator', streak: 7, badges: [], rankChange: 0, tool: 'Antigravity' },
  { rank: 12, name: 'Nina Petrov', avatar: 'NP', entity: 'OCL', team: 'Security', aiContribution: 37, aiAdoption: 61, productivityIndex: 73, qualityScore: 95, level: 2, levelName: 'AI Contributor', streak: 42, badges: ['🛡️', '🎯'], rankChange: 1, tool: 'Cursor' },
];

export const mockEntityLeaderboard = [
  { rank: 1, name: 'Paytm', aiScore: 88, growth: 15.2, roi: 3.8, devs: 94, rankChange: 0 },
  { rank: 2, name: 'OCL', aiScore: 85, growth: 18.1, roi: 3.5, devs: 68, rankChange: 1 },
  { rank: 3, name: 'PPSL', aiScore: 72, growth: 12.4, roi: 2.9, devs: 52, rankChange: -1 },
  { rank: 4, name: 'Paytm Money', aiScore: 68, growth: 8.7, roi: 2.4, devs: 38, rankChange: 0 },
  { rank: 5, name: 'PML', aiScore: 55, growth: 22.3, roi: 2.1, devs: 45, rankChange: 2 },
  { rank: 6, name: 'PayPay', aiScore: 51, growth: 14.8, roi: 1.8, devs: 42, rankChange: -1 },
  { rank: 7, name: 'Paytm Insurance', aiScore: 47, growth: 9.2, roi: 1.6, devs: 28, rankChange: 0 },
  { rank: 8, name: 'Paytm Payments Bank', aiScore: 42, growth: 6.5, roi: 1.3, devs: 35, rankChange: -1 },
];

export interface TeamLeaderboardEntry {
  rank: number;
  team: string;
  entity: string;
  prVelocity: number;
  aiMergeRate: number;
  toolDiversity: number;
  maturityScore: number;
  devs: number;
  rankChange: number;
}

export const mockTeamLeaderboard: TeamLeaderboardEntry[] = [
  { rank: 1, team: 'Platform', entity: 'Paytm', prVelocity: 142, aiMergeRate: 94, toolDiversity: 3, maturityScore: 96, devs: 18, rankChange: 1 },
  { rank: 2, team: 'Data', entity: 'OCL', prVelocity: 128, aiMergeRate: 91, toolDiversity: 3, maturityScore: 93, devs: 14, rankChange: 0 },
  { rank: 3, team: 'DevOps', entity: 'PPSL', prVelocity: 118, aiMergeRate: 89, toolDiversity: 2, maturityScore: 90, devs: 12, rankChange: 2 },
  { rank: 4, team: 'Product', entity: 'Paytm', prVelocity: 105, aiMergeRate: 87, toolDiversity: 2, maturityScore: 88, devs: 16, rankChange: -1 },
  { rank: 5, team: 'App', entity: 'PML', prVelocity: 98, aiMergeRate: 85, toolDiversity: 2, maturityScore: 85, devs: 11, rankChange: 0 },
  { rank: 6, team: 'Growth', entity: 'Paytm Money', prVelocity: 92, aiMergeRate: 82, toolDiversity: 1, maturityScore: 80, devs: 9, rankChange: -2 },
  { rank: 7, team: 'Analytics', entity: 'OCL', prVelocity: 85, aiMergeRate: 80, toolDiversity: 2, maturityScore: 78, devs: 10, rankChange: 1 },
  { rank: 8, team: 'Business', entity: 'PayPay', prVelocity: 78, aiMergeRate: 76, toolDiversity: 1, maturityScore: 72, devs: 8, rankChange: -1 },
  { rank: 9, team: 'Security', entity: 'Paytm', prVelocity: 72, aiMergeRate: 88, toolDiversity: 1, maturityScore: 85, devs: 7, rankChange: 0 },
  { rank: 10, team: 'QA', entity: 'PPSL', prVelocity: 65, aiMergeRate: 74, toolDiversity: 1, maturityScore: 68, devs: 6, rankChange: 1 },
];

export interface RepoLeaderboardEntry {
  rank: number;
  repo: string;
  entity: string;
  team: string;
  aiEngagement: 'High' | 'Medium' | 'Low' | 'None';
  aiPRMergeSpeed: number; // hours
  totalPRs: number;
  aiPRs: number;
  sensitiveExposure: boolean;
  rankChange: number;
}

export const mockRepoLeaderboard: RepoLeaderboardEntry[] = [
  { rank: 1, repo: 'payment-gateway-core', entity: 'Paytm', team: 'Platform', aiEngagement: 'High', aiPRMergeSpeed: 1.2, totalPRs: 342, aiPRs: 248, sensitiveExposure: true, rankChange: 0 },
  { rank: 2, repo: 'data-pipeline-v3', entity: 'OCL', team: 'Data', aiEngagement: 'High', aiPRMergeSpeed: 1.5, totalPRs: 287, aiPRs: 201, sensitiveExposure: false, rankChange: 2 },
  { rank: 3, repo: 'merchant-dashboard', entity: 'PPSL', team: 'Product', aiEngagement: 'High', aiPRMergeSpeed: 1.8, totalPRs: 256, aiPRs: 179, sensitiveExposure: false, rankChange: -1 },
  { rank: 4, repo: 'mobile-app-android', entity: 'PML', team: 'App', aiEngagement: 'Medium', aiPRMergeSpeed: 2.1, totalPRs: 198, aiPRs: 118, sensitiveExposure: false, rankChange: 1 },
  { rank: 5, repo: 'risk-engine', entity: 'Paytm', team: 'Security', aiEngagement: 'Medium', aiPRMergeSpeed: 2.8, totalPRs: 175, aiPRs: 87, sensitiveExposure: true, rankChange: -2 },
  { rank: 6, repo: 'analytics-platform', entity: 'Paytm Money', team: 'Analytics', aiEngagement: 'Medium', aiPRMergeSpeed: 2.3, totalPRs: 154, aiPRs: 85, sensitiveExposure: false, rankChange: 0 },
  { rank: 7, repo: 'growth-experiments', entity: 'PayPay', team: 'Growth', aiEngagement: 'Low', aiPRMergeSpeed: 3.1, totalPRs: 132, aiPRs: 39, sensitiveExposure: false, rankChange: 1 },
  { rank: 8, repo: 'infra-terraform', entity: 'OCL', team: 'DevOps', aiEngagement: 'Low', aiPRMergeSpeed: 3.5, totalPRs: 98, aiPRs: 24, sensitiveExposure: true, rankChange: -1 },
  { rank: 9, repo: 'legacy-billing', entity: 'PPSL', team: 'Business', aiEngagement: 'None', aiPRMergeSpeed: 4.2, totalPRs: 76, aiPRs: 4, sensitiveExposure: true, rankChange: 0 },
  { rank: 10, repo: 'qa-automation', entity: 'PML', team: 'QA', aiEngagement: 'Low', aiPRMergeSpeed: 2.9, totalPRs: 112, aiPRs: 31, sensitiveExposure: false, rankChange: 2 },
];

export const mockBadges = [
  // PR-based
  { id: 1, name: 'First AI PR', icon: '🚀', description: 'Merged your first AI-assisted PR', earned: true, category: 'PR' },
  { id: 2, name: '50 AI PRs', icon: '⚡', description: '50 AI-assisted PRs merged', earned: true, category: 'PR' },
  { id: 3, name: '100 AI PRs', icon: '💎', description: '100 AI-assisted PRs merged', earned: true, category: 'PR' },
  { id: 4, name: '500 AI PRs', icon: '👑', description: '500 AI-assisted PRs merged', earned: false, category: 'PR' },
  // Streak-based
  { id: 5, name: '7-Day Streak', icon: '🔥', description: '7 consecutive days of AI PRs', earned: true, category: 'Streak' },
  { id: 6, name: '30-Day Streak', icon: '🌋', description: '30 consecutive days of AI PRs', earned: true, category: 'Streak' },
  { id: 7, name: '90-Day Streak', icon: '☄️', description: '90 consecutive days of AI PRs', earned: false, category: 'Streak' },
  { id: 8, name: '365-Day Streak', icon: '🌟', description: 'Full year AI PR streak', earned: false, category: 'Streak' },
  // Quality
  { id: 9, name: 'Zero-Revert Streak', icon: '🛡️', description: '30 days with no AI PR reverts', earned: true, category: 'Quality' },
  { id: 10, name: 'Quality Guardian', icon: '🎯', description: '95%+ quality score for 60 days', earned: false, category: 'Quality' },
  { id: 11, name: 'Bug Squasher', icon: '🐛', description: 'Fixed 50 bugs with AI assistance', earned: true, category: 'Quality' },
  // Tool mastery
  { id: 12, name: 'Multi-Tool Champion', icon: '🏆', description: 'Used 3+ AI tools effectively', earned: true, category: 'Tool' },
  { id: 13, name: 'Cursor Master', icon: '🖱️', description: '200+ PRs with Cursor', earned: true, category: 'Tool' },
  { id: 14, name: 'Kiro Pioneer', icon: '🔮', description: '100+ PRs with Kiro', earned: false, category: 'Tool' },
  // Team & Collaboration
  { id: 15, name: 'Team Player', icon: '🤝', description: 'Reviewed 100+ AI PRs from teammates', earned: true, category: 'Team' },
  { id: 16, name: 'Mentor', icon: '🎓', description: 'Helped 5 devs reach L3+', earned: false, category: 'Team' },
  { id: 17, name: 'Entity Champion', icon: '🏛️', description: 'Top contributor in your entity for 4 weeks', earned: false, category: 'Team' },
  // Speed
  { id: 18, name: 'Speed Demon', icon: '⚡', description: 'Fastest merge time 10 weeks in a row', earned: true, category: 'Speed' },
  { id: 19, name: 'AI Pioneer', icon: '🌠', description: 'Top 5% AI adoption in org', earned: false, category: 'Speed' },
  { id: 20, name: 'Velocity King', icon: '🚄', description: '50+ PRs in a single week', earned: false, category: 'Speed' },
];

export const mockLevels = [
  { level: 1, name: 'AI Explorer', minScore: 0, color: 'muted' },
  { level: 2, name: 'AI Contributor', minScore: 10, color: 'muted' },
  { level: 3, name: 'AI Accelerator', minScore: 20, color: 'accent' },
  { level: 4, name: 'AI Specialist', minScore: 30, color: 'accent' },
  { level: 5, name: 'AI Optimizer', minScore: 40, color: 'primary' },
  { level: 6, name: 'AI Master', minScore: 55, color: 'primary' },
  { level: 7, name: 'AI Architect', minScore: 65, color: 'warning' },
  { level: 8, name: 'AI Maestro', minScore: 75, color: 'warning' },
  { level: 9, name: 'AI Virtuoso', minScore: 88, color: 'purple' },
  { level: 10, name: 'AI Expert', minScore: 95, color: 'rose' },
];

export const mockAgents = [
  { id: 'productivity', name: 'Productivity Analyst', icon: '📊', status: 'active', lastInsight: 'Paytm Platform team AI velocity increased 23% this sprint' },
  { id: 'quality', name: 'Quality Risk Agent', icon: '🛡️', status: 'active', lastInsight: 'PPSL App team showing 8% revert rate on AI PRs — above threshold' },
  { id: 'optimization', name: 'Tool Optimizer', icon: '⚙️', status: 'active', lastInsight: 'Cursor outperforms Kiro by 18% ROI for Paytm teams' },
  { id: 'license', name: 'License Optimizer', icon: '💰', status: 'warning', lastInsight: '12 idle Kiro licenses detected in PML entity' },
  { id: 'forecast', name: 'Growth Forecaster', icon: '📈', status: 'active', lastInsight: 'Projected 52% AI contribution by Q3 at current growth rate' },
];

// Analytics data
export const mockPRVelocityTrend = [
  { month: 'Jan', velocity: 820, aiPRs: 180 },
  { month: 'Feb', velocity: 890, aiPRs: 245 },
  { month: 'Mar', velocity: 950, aiPRs: 310 },
  { month: 'Apr', velocity: 1020, aiPRs: 390 },
  { month: 'May', velocity: 1100, aiPRs: 462 },
  { month: 'Jun', velocity: 1180, aiPRs: 520 },
];

export const mockEntityComparison = entities.map((e, i) => ({
  entity: e,
  aiAdoption: [88, 85, 72, 68, 55, 51, 47, 42][i] || 40,
  productivity: [96, 93, 87, 82, 78, 74, 70, 65][i] || 60,
  quality: [98, 96, 93, 91, 89, 92, 88, 85][i] || 80,
}));

// Notifications data
export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  { id: '1', type: 'alert', title: 'High Revert Rate Detected', message: 'PPSL App team has 8% revert rate on AI PRs — above 5% threshold', time: '5m ago', read: false },
  { id: '2', type: 'warning', title: 'Idle Licenses Detected', message: '12 idle Kiro licenses in PML entity. Estimated waste: $2,400/mo', time: '1h ago', read: false },
  { id: '3', type: 'success', title: 'Sync Complete', message: 'Paytm entity sync completed successfully. 342 PRs processed.', time: '2h ago', read: true },
  { id: '4', type: 'info', title: 'Weekly Digest Ready', message: 'Your weekly AI productivity digest is ready to view', time: '4h ago', read: true },
  { id: '5', type: 'alert', title: 'Sensitive Module AI Change', message: 'AI-generated code detected in payment-gateway-core risk module', time: '6h ago', read: false },
  { id: '6', type: 'warning', title: 'Low AI Adoption', message: 'PayPay entity AI adoption below 30% target for 3 consecutive weeks', time: '1d ago', read: true },
  { id: '7', type: 'success', title: 'Badge Earned!', message: 'Sarah Chen earned the "100 AI PRs" badge', time: '1d ago', read: true },
  { id: '8', type: 'info', title: 'New Challenge Started', message: 'Q1 AI Adoption Sprint challenge has begun across all entities', time: '2d ago', read: true },
];

// Teams data
export interface TeamDetail {
  name: string;
  entity: string;
  lead: string;
  devs: number;
  aiAdoption: number;
  avgLevel: number;
  topTool: string;
  prVelocity: number;
  qualityScore: number;
}

export const mockTeams: TeamDetail[] = [
  { name: 'Platform', entity: 'Paytm', lead: 'Sarah Chen', devs: 18, aiAdoption: 92, avgLevel: 7, topTool: 'Cursor', prVelocity: 142, qualityScore: 98 },
  { name: 'Data', entity: 'OCL', lead: 'Marcus Rodriguez', devs: 14, aiAdoption: 88, avgLevel: 6, topTool: 'Kiro', prVelocity: 128, qualityScore: 96 },
  { name: 'Product', entity: 'Paytm', lead: 'Aisha Patel', devs: 16, aiAdoption: 82, avgLevel: 5, topTool: 'Cursor', prVelocity: 105, qualityScore: 94 },
  { name: 'DevOps', entity: 'PPSL', lead: 'David Kim', devs: 12, aiAdoption: 79, avgLevel: 5, topTool: 'Antigravity', prVelocity: 118, qualityScore: 91 },
  { name: 'App', entity: 'PML', lead: 'James Liu', devs: 11, aiAdoption: 74, avgLevel: 4, topTool: 'Cursor', prVelocity: 98, qualityScore: 90 },
  { name: 'Growth', entity: 'Paytm Money', lead: 'Elena Kowalski', devs: 9, aiAdoption: 70, avgLevel: 4, topTool: 'Cursor', prVelocity: 92, qualityScore: 89 },
  { name: 'Analytics', entity: 'OCL', lead: 'Priya Sharma', devs: 10, aiAdoption: 68, avgLevel: 4, topTool: 'Kiro', prVelocity: 85, qualityScore: 93 },
  { name: 'Business', entity: 'PayPay', lead: 'Tom Anderson', devs: 8, aiAdoption: 62, avgLevel: 3, topTool: 'Antigravity', prVelocity: 78, qualityScore: 88 },
  { name: 'Security', entity: 'Paytm', lead: 'Nina Petrov', devs: 7, aiAdoption: 58, avgLevel: 3, topTool: 'Cursor', prVelocity: 72, qualityScore: 95 },
  { name: 'QA', entity: 'PPSL', lead: 'Ahmed Hassan', devs: 6, aiAdoption: 52, avgLevel: 2, topTool: 'Kiro', prVelocity: 65, qualityScore: 87 },
];
