import { Injectable } from '@nestjs/common';
import { MAT_PORC_SNIPPETS } from './data/mat-porc.snippets.js';
import { LC_INF_SNIPPETS } from './data/lc-inf.snippets.js';
import { SOC_CIUD_SNIPPETS } from './data/soc-ciud.snippets.js';
import { CN_SNIPPETS } from './data/cn.snippets.js';
import { ING_SNIPPETS } from './data/ing.snippets.js';

const SNIPPETS_BY_SKILL_CODE: Record<string, string[]> = {
  'MAT-PORC': MAT_PORC_SNIPPETS,
  'LC-INF': LC_INF_SNIPPETS,
  'SOC-CIUD': SOC_CIUD_SNIPPETS,
  CN: CN_SNIPPETS,
  ING: ING_SNIPPETS,
};

@Injectable()
export class KnowledgeBaseService {
  /** Retrieves the top educational snippets for a skill (simple in-memory RAG, no vector search). */
  retrieve(skillCode: string, limit = 2): string[] {
    const snippets = SNIPPETS_BY_SKILL_CODE[skillCode] ?? [];
    return snippets.slice(0, limit);
  }

  /** Student-facing hint: the Nth (1-based) snippet for a skill, or null once they run out. */
  getHint(skillCode: string, hintNumber: number): string | null {
    const snippets = SNIPPETS_BY_SKILL_CODE[skillCode] ?? [];
    return snippets[hintNumber - 1] ?? null;
  }
}
