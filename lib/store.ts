import { actionSeed, businessSummarySeed } from '@/data/seed';
import { generateDailyBrief } from '@/lib/brief';
import { generateIssues } from '@/lib/rules';
import { ActionItem, ActionStatus } from '@/types/business';

let actions: ActionItem[] = [...actionSeed];

export const getSummary = () => businessSummarySeed;
export const getIssues = () => generateIssues();
export const getIssueById = (id: string) => getIssues().find((issue) => issue.id === id);
export const getActions = () => actions;
export const getBrief = () => generateDailyBrief(getIssues(), getActions());

export const updateActionStatus = (id: string, status: ActionStatus) => {
  actions = actions.map((action) =>
    action.id === id
      ? { ...action, status, updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
      : action
  );
};
