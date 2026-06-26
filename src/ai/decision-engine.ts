/* ===================================================================
   CommerceOS Decision Engine V1

   Understands user intent and decides:
   - Which Skills to use
   - Which Workflow to execute
   - Which AI Models to assign per task
   
   "AI decide everything" — not fixed workflows
   =================================================================== */

import { registry } from '@/skills-v2';
import type { Skill, SupportedPlatform, SkillCategory } from '@/skills-v2/types';
import type { CommerceRequest, DecisionResult } from './types';

/* ── Intent patterns → Skill categories ── */
const intentPatterns: { patterns: RegExp[]; category: SkillCategory; priority: number }[] = [
  { patterns: [/主图|hero|main image|white bg|白底/i],     category: 'image',       priority: 10 },
  { patterns: [/场景|lifestyle|scene/i],                    category: 'image',       priority: 9 },
  { patterns: [/信息图|infographic|chart|size chart/i],      category: 'image',       priority: 8 },
  { patterns: [/视频|video|tiktok|抖音|douyin/i],           category: 'video',       priority: 10 },
  { patterns: [/标题|title/i],                               category: 'copywriting', priority: 10 },
  { patterns: [/描述|description|bullet|卖点|详情|listing/i], category: 'copywriting', priority: 9 },
  { patterns: [/seo|关键词|keyword|搜索词|ranking/i],        category: 'seo',          priority: 10 },
  { patterns: [/翻译|translate|翻译成/i],                     category: 'translation',  priority: 10 },
  { patterns: [/发布|publish|上架/i],                         category: 'publishing',   priority: 10 },
  { patterns: [/分析|analytics|ctr|cvr|roi/i],               category: 'analytics',    priority: 8 },
];

/* ── Model assignment rules per category ── */
const defaultModels: Record<SkillCategory, string[]> = {
  image:       ['flux', 'gpt-image', 'imagen'],
  video:       ['kling', 'veo', 'pika'],
  copywriting: ['gpt-4', 'claude', 'gemini'],
  seo:         ['gpt-4', 'claude'],
  translation: ['gpt-4', 'claude'],
  publishing:  ['gpt-4'],
  analytics:   ['gpt-4', 'claude'],
  automation:  ['gpt-4'],
  platform:    ['gpt-4'],
};

/* ── Decision Engine ── */
export class DecisionEngine {
  /** Analyze user intent and decide what to execute */
  decide(request: CommerceRequest): DecisionResult {
    const reasoning: string[] = [];
    const modelAssignments = new Map<string, string>();
    const skills: Skill[] = [];

    // 1. Parse intent → extract categories
    const matchedCategories = this.parseIntent(request.intent);
    reasoning.push(`Intent analysis: matched categories [${matchedCategories.join(', ')}]`);

    // 2. For each platform, find matching skills
    for (const platform of request.platforms) {
      reasoning.push(`Platform: ${platform}`);

      for (const category of matchedCategories) {
        const platformSkills = registry.recommend(platform, category);
        
        if (platformSkills.length === 0) {
          // Fall back to generic platform-agnostic skills
          const genericSkills = registry.getByCategory(category).filter(
            s => s.supportedPlatforms.length === 0 || s.supportedPlatforms.includes('generic')
          );
          if (genericSkills.length > 0) {
            const best = genericSkills[0];
            skills.push(best);
            modelAssignments.set(best.id, this.assignModel(best));
            reasoning.push(`  → ${best.name} (generic, model: ${modelAssignments.get(best.id)})`);
          }
        } else {
          // Take top skills based on platform specificity
          const topSkills = platformSkills.slice(0, 5);
          for (const skill of topSkills) {
            if (!skills.find(s => s.id === skill.id)) {
              skills.push(skill);
              modelAssignments.set(skill.id, this.assignModel(skill));
              reasoning.push(`  → ${skill.name} (model: ${modelAssignments.get(skill.id)})`);
            }
          }
        }
      }
    }

    // 3. If no skills matched, fallback to platform skills
    if (skills.length === 0) {
      for (const platform of request.platforms) {
        const platformSkills = registry.getByCategory('platform').filter(
          s => s.supportedPlatforms.includes(platform)
        );
        if (platformSkills.length > 0) {
          skills.push(platformSkills[0]);
          reasoning.push(`Fallback to platform skill: ${platformSkills[0].name}`);
        }
      }
    }

    // 4. Sort by workflow dependencies
    this.topologicalSort(skills);

    return { skills, modelAssignments, reasoning };
  }

  /** Natural language intent → skill categories */
  private parseIntent(intent: string): SkillCategory[] {
    const matched = intentPatterns
      .filter(p => p.patterns.some(r => r.test(intent)))
      .sort((a, b) => b.priority - a.priority);

    // Remove duplicate categories, keep highest priority
    const seen = new Set<SkillCategory>();
    const result: SkillCategory[] = [];
    for (const m of matched) {
      if (!seen.has(m.category)) {
        seen.add(m.category);
        result.push(m.category);
      }
    }

    return result.length > 0 ? result : ['copywriting', 'image']; // default
  }

  /** Assign the best model for a skill */
  private assignModel(skill: Skill): string {
    const allowed = skill.supportedModels.length > 0
      ? skill.supportedModels
      : defaultModels[skill.category] ?? ['gpt-4'];
    return allowed[0];
  }

  /** Sort skills by workflow dependencies */
  private topologicalSort(skills: Skill[]): void {
    // image → video → copywriting → seo → translation → publishing
    const order: SkillCategory[] = ['image', 'video', 'copywriting', 'seo', 'translation', 'analytics', 'automation', 'publishing', 'platform'];
    skills.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  }
}

export const decisionEngine = new DecisionEngine();
