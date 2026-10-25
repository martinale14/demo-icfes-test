import { CareersService } from './careers.service.js';

function fakePrisma(states: { skillCode: string; masteryProbability: number }[]) {
  return {
    studentSkillState: {
      findMany: async () =>
        states.map((s) => ({
          masteryProbability: s.masteryProbability,
          skill: { code: s.skillCode },
        })),
    },
  } as never;
}

describe('CareersService.computeAffinities', () => {
  it('ranks a math/science-heavy profile above a language-heavy one for Ingeniería', async () => {
    const service = new CareersService(
      fakePrisma([
        { skillCode: 'MAT-PORC', masteryProbability: 0.9 },
        { skillCode: 'CN', masteryProbability: 0.8 },
        { skillCode: 'LC-INF', masteryProbability: 0.3 },
        { skillCode: 'SOC-CIUD', masteryProbability: 0.3 },
        { skillCode: 'ING', masteryProbability: 0.3 },
      ]),
    );

    const result = await service.computeAffinities('demo-student');
    const ranked = result.map((r) => r.code);

    expect(result).toHaveLength(10);
    // Ingeniería has the heaviest MAT weight (1.0) combined with a strong CN weight
    // (0.7), so it should outrank LENGUAS, which barely weighs MAT/CN at all.
    expect(ranked[0]).toBe('INGENIERIA');
    expect(result[0].rank).toBe(1);
    expect(ranked.indexOf('INGENIERIA')).toBeLessThan(ranked.indexOf('LENGUAS'));
    expect(result.every((r) => r.affinityScore >= 0 && r.affinityScore <= 100)).toBe(true);
  });

  it('defaults missing skills to the initial mastery prior instead of crashing', async () => {
    const service = new CareersService(fakePrisma([])); // no skill states at all
    const result = await service.computeAffinities('demo-student');
    expect(result).toHaveLength(10);
    expect(result.every((r) => r.affinityScore === 30)).toBe(true); // all skills at 0.3 prior
  });

  it('sorts results descending by affinityScore', async () => {
    const service = new CareersService(
      fakePrisma([
        { skillCode: 'LC-INF', masteryProbability: 1.0 },
        { skillCode: 'SOC-CIUD', masteryProbability: 1.0 },
        { skillCode: 'MAT-PORC', masteryProbability: 0.1 },
        { skillCode: 'CN', masteryProbability: 0.1 },
        { skillCode: 'ING', masteryProbability: 0.2 },
      ]),
    );

    const result = await service.computeAffinities('demo-student');
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].affinityScore).toBeGreaterThanOrEqual(result[i].affinityScore);
    }
  });
});
