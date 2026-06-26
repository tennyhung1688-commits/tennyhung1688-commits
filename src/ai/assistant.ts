/* ===================================================================
   CommerceOS Commerce Assistant V2

   The single AI interface users interact with.
   "帮我生成 Amazon 主图" — AI decides everything.

   V2: All generation routes through DeepSeek via GenerationEngine.
   Display model names (FLUX, Kling, GPT-4, etc.) are preserved
   in UI but never exposed as DeepSeek to end users.
   =================================================================== */

import { decisionEngine } from './decision-engine';
import { modelRouter } from './model-router';
import { promptBuilder } from './prompt-builder';
import { commerceMemory } from './memory';
import { generationEngine } from './generation-engine';
import type {
  CommerceRequest, CommerceResponse, ExecutionStep,
  GeneratedAsset, ProductContext, BrandContext,
  ModelSelection,
} from './types';

export class CommerceAssistant {
  /** Main entry point — process a natural language request */
  async process(request: CommerceRequest): Promise<CommerceResponse> {
    const startTime = Date.now();
    const steps: ExecutionStep[] = [];
    const assets: GeneratedAsset[] = [];
    const skillsUsed: string[] = [];

    // 1. Load Commerce Memory
    const memories = commerceMemory.recall(
      request.workspaceId || 'default',
      {
        productName: request.productData?.name,
        brandName: request.brandData?.name,
      }
    );
    const preferences = commerceMemory.buildPreferences(request.workspaceId || 'default');

    // 2. Decision: what skills and in what order?
    const decision = decisionEngine.decide({
      ...request,
      preferences: { ...preferences, ...request.preferences },
    });

    // 3. Execute each skill in order
    for (const skill of decision.skills) {
      const stepStart = Date.now();
      const assignedModel = (decision.modelAssignments.get(skill.id) || 'gpt-4') as import('@/skills-v2/types').SupportedModel;
      
      let modelSelection: ModelSelection | undefined;

      try {
        // Route to best model (display name only — actual API goes to DeepSeek)
        modelSelection = modelRouter.route(
          skill.category,
          assignedModel,
          { platform: request.platforms[0], task: skill.description }
        );

        // Build prompt
        const platform = request.platforms[0] || 'generic';
        const rendered = promptBuilder.build({
          product: request.productData || this.emptyProduct(),
          brand: request.brandData,
          skill,
          platform,
          userPreferences: preferences,
          commerceMemory: memories,
        });

        // Generate via unified engine (all models → DeepSeek, transparent to user)
        const result = await generationEngine.generate({
          skill: { id: skill.id, name: skill.name, category: skill.category },
          displayModel: modelSelection.model,
          systemPrompt: rendered.systemPrompt,
          userPrompt: rendered.userPrompt,
        });

        // Collect results — display model name preserved, DeepSeek invisible
        const duration = result.duration;
        skillsUsed.push(skill.id);
        steps.push({
          id: `step-${steps.length + 1}`,
          skillId: skill.id,
          name: skill.name,
          status: 'completed',
          modelUsed: modelSelection.model, // show the selected model, not DeepSeek
          duration,
          input: { skill: skill.id, model: modelSelection.model },
          output: { generated: true, tokensUsed: result.tokensUsed },
        });

        // Create asset with generated content
        assets.push({
          type: skill.category === 'image' ? 'image' 
                : skill.category === 'video' ? 'video' 
                : 'text',
          skillId: skill.id,
          name: skill.name,
          content: result.content,
          metadata: { model: modelSelection.model, platform, duration, tokens: result.tokensUsed },
        });

        // Remember this success
        commerceMemory.rememberSuccess(
          request.workspaceId || 'default',
          skill.id,
          { model: modelSelection.model, duration, platform }
        );
      } catch (error) {
        steps.push({
          id: `step-${steps.length + 1}`,
          skillId: skill.id,
          name: skill.name,
          status: 'failed',
          duration: Date.now() - stepStart,
          modelUsed: modelSelection?.model || assignedModel,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // 4. Build response
    const completedSteps = steps.filter(s => s.status === 'completed').length;
    return {
      status: completedSteps === steps.length ? 'success' : 
              completedSteps > 0 ? 'partial' : 'error',
      summary: this.buildSummary(request, steps, assets),
      assets,
      steps,
      totalDuration: Date.now() - startTime,
      skillsUsed,
    };
  }

  private buildSummary(request: CommerceRequest, steps: ExecutionStep[], assets: GeneratedAsset[]): string {
    const completed = steps.filter(s => s.status === 'completed').length;
    const failed = steps.filter(s => s.status === 'failed').length;
    const platforms = request.platforms.join(', ');

    if (failed === 0) {
      return `Generated ${assets.length} assets for ${platforms}: ${assets.map(a => a.name).join(', ')}`;
    }
    return `Completed ${completed}/${steps.length} tasks for ${platforms}. ${failed} failed.`;
  }

  private emptyProduct(): ProductContext {
    return { name: 'Unknown', category: 'General', attributes: {}, sellingPoints: [], images: [] };
  }
}

export const commerceAssistant = new CommerceAssistant();
