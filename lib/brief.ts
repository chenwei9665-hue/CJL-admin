import { dailyBriefSeed } from '@/data/seed';
import { ActionItem, DailyBrief, Issue } from '@/types/business';

export function generateDailyBrief(issues: Issue[], actions: ActionItem[]): DailyBrief {
  const topIssues = issues.slice(0, 3).map((issue) => issue.title);
  const priorities = actions
    .filter((a) => a.status === 'todo' || a.status === 'in_progress')
    .slice(0, 3)
    .map((a) => a.title);

  return {
    ...dailyBriefSeed,
    keyIssues: topIssues.length ? topIssues : dailyBriefSeed.keyIssues,
    todayPriorities: priorities.length ? priorities : dailyBriefSeed.todayPriorities
  };
}
