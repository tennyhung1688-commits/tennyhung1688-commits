import type { Skill, SkillCategory, SupportedPlatform, SkillRegistry } from './types';

/**
 * Central skill registry — single source of truth for all CommerceOS skills.
 * Extensible: add a new skill file, import it, and register it here.
 */
class CentralRegistry implements SkillRegistry {
  private skills: Map<string, Skill> = new Map();

  register(skill: Skill): void {
    if (this.skills.has(skill.id)) {
      console.warn(`Skill "${skill.id}" already registered — overwriting.`);
    }
    this.skills.set(skill.id, skill);
  }

  registerAll(skills: Skill[]): void {
    skills.forEach(s => this.register(s));
  }

  get(id: string): Skill | undefined {
    return this.skills.get(id);
  }

  getByCategory(category: SkillCategory): Skill[] {
    return Array.from(this.skills.values()).filter(s => s.category === category);
  }

  getByPlatform(platform: SupportedPlatform): Skill[] {
    return Array.from(this.skills.values()).filter(
      s => s.supportedPlatforms.length === 0 || s.supportedPlatforms.includes(platform)
    );
  }

  search(query: string): Skill[] {
    const q = query.toLowerCase();
    return Array.from(this.skills.values()).filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  getAll(): Skill[] {
    return Array.from(this.skills.values());
  }

  getCategories(): SkillCategory[] {
    const cats = new Set<SkillCategory>();
    this.skills.forEach(s => cats.add(s.category));
    return Array.from(cats);
  }

  /** Recommend skills for a given platform and category */
  recommend(platform: SupportedPlatform, category?: SkillCategory): Skill[] {
    let skills = this.getByPlatform(platform);
    if (category) {
      skills = skills.filter(s => s.category === category);
    }
    return skills.sort((a, b) => b.supportedPlatforms.length - a.supportedPlatforms.length);
  }

  /** How many skills are registered */
  get size(): number {
    return this.skills.size;
  }
}

/* Singleton export */
export const registry = new CentralRegistry();
