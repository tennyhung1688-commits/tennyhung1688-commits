/* ===================================================================
   CommerceOS Commerce Memory V1

   Persistent AI memory — products, brands, campaigns, preferences.
   AI never asks the same question twice.
   =================================================================== */

import type { MemoryRecord, ProductContext, BrandContext, UserPreferences } from './types';

export class CommerceMemory {
  private store: Map<string, MemoryRecord[]> = new Map();

  constructor() {
    // In production: load from database
  }

  /** Get workspace memory */
  getWorkspaceMemory(workspaceId: string): MemoryRecord[] {
    return this.store.get(workspaceId) || [];
  }

  /** Remember a product */
  rememberProduct(workspaceId: string, product: ProductContext): void {
    this.remember(workspaceId, {
      type: 'product',
      key: `product:${product.name}`,
      data: {
        name: product.name,
        sku: product.sku,
        category: product.category,
        attributes: product.attributes,
        sellingPoints: product.sellingPoints,
        lastUsed: new Date().toISOString(),
      },
      importance: 0.8,
      lastAccessed: new Date(),
    });
  }

  /** Remember a brand */
  rememberBrand(workspaceId: string, brand: BrandContext): void {
    this.remember(workspaceId, {
      type: 'brand',
      key: `brand:${brand.name}`,
      data: {
        name: brand.name,
        tone: brand.tone,
        style: brand.style,
        colors: brand.colors,
        fonts: brand.fonts,
        guidelines: brand.guidelines,
      },
      importance: 0.9,
      lastAccessed: new Date(),
    });
  }

  /** Remember a successful generation */
  rememberSuccess(workspaceId: string, skillId: string, context: Record<string, unknown>): void {
    this.remember(workspaceId, {
      type: 'success',
      key: `success:${skillId}:${Date.now()}`,
      data: { skillId, ...context, timestamp: new Date().toISOString() },
      importance: 0.6,
      lastAccessed: new Date(),
    });
  }

  /** Remember user preferences */
  rememberPreference(workspaceId: string, key: string, value: unknown): void {
    this.remember(workspaceId, {
      type: 'preference',
      key: `pref:${key}`,
      data: { key, value },
      importance: 0.7,
      lastAccessed: new Date(),
    });
  }

  /** Recall memories relevant to a context */
  recall(workspaceId: string, context: { productName?: string; brandName?: string; skillCategory?: string }): MemoryRecord[] {
    const memories = this.getWorkspaceMemory(workspaceId);
    const relevant: MemoryRecord[] = [];

    for (const mem of memories) {
      if (context.productName && mem.key.includes(context.productName)) {
        relevant.push(mem);
      }
      if (context.brandName && mem.key.includes(context.brandName)) {
        relevant.push(mem);
      }
      if (mem.type === 'preference') {
        relevant.push(mem);
      }
      // Include recent success records
      if (mem.type === 'success' && context.skillCategory) {
        relevant.push(mem);
      }
    }

    // Sort by importance, then recency
    relevant.sort((a, b) => {
      const impDiff = b.importance - a.importance;
      if (impDiff !== 0) return impDiff;
      return b.lastAccessed.getTime() - a.lastAccessed.getTime();
    });

    // Return top 10
    return relevant.slice(0, 10);
  }

  /** Build user preferences from memory */
  buildPreferences(workspaceId: string): UserPreferences {
    const memories = this.getWorkspaceMemory(workspaceId);
    const prefs = memories.filter(m => m.type === 'preference');

    return {
      language: (prefs.find(p => p.key === 'pref:language')?.data.value as string) || 'en',
      savedStyles: (prefs.find(p => p.key === 'pref:styles')?.data.value as string[]) || [],
      history: memories
        .filter(m => m.type === 'success')
        .map(m => m.data.skillId as string)
        .slice(-20),
    };
  }

  private remember(workspaceId: string, record: MemoryRecord): void {
    const existing = this.store.get(workspaceId) || [];
    // Update if same key exists
    const idx = existing.findIndex(r => r.key === record.key);
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...record, lastAccessed: new Date() };
    } else {
      existing.push(record);
    }
    this.store.set(workspaceId, existing);
  }
}

export const commerceMemory = new CommerceMemory();
