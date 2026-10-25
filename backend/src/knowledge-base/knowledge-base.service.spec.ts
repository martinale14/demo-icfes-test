import { KnowledgeBaseService } from './knowledge-base.service.js';

describe('KnowledgeBaseService.getHint', () => {
  const service = new KnowledgeBaseService();

  it('returns the Nth snippet (1-based) for a known skill', () => {
    const first = service.getHint('MAT-PORC', 1);
    const second = service.getHint('MAT-PORC', 2);
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(first).not.toBe(second);
  });

  it('returns null once the student runs out of hints for that skill', () => {
    expect(service.getHint('MAT-PORC', 999)).toBeNull();
  });

  it('returns null for an unknown skill code', () => {
    expect(service.getHint('NOT-A-SKILL', 1)).toBeNull();
  });
});
