import type { Skill, SkillInputSchema, SkillOutputSchema, SkillWorkflowStep, SkillPromptTemplate } from './types';

/* ── Helper: create a skill with defaults ── */
export function defineSkill(partial: Omit<Skill, 'inputSchema' | 'outputSchema' | 'workflow' | 'promptTemplate' | 'requiresConnection'> & {
  input: { required: string[]; properties: SkillInputSchema['properties'] };
  output: SkillOutputSchema;
  steps: SkillWorkflowStep[];
  prompt: SkillPromptTemplate;
  requiresConnection?: boolean;
}): Skill {
  return {
    ...partial,
    inputSchema: { type: 'object', required: partial.input.required, properties: partial.input.properties },
    outputSchema: partial.output,
    workflow: partial.steps,
    promptTemplate: partial.prompt,
    supportedPlatforms: partial.supportedPlatforms ?? [],
    supportedModels: partial.supportedModels ?? [],
    tags: partial.tags ?? ['official'],
    requiresConnection: partial.requiresConnection ?? false,
  };
}
