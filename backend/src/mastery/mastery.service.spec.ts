import { MasteryService } from './mastery.service.js';

// computeAttemptScore / computeNewMastery are pure functions — no Prisma needed.
const mastery = new MasteryService(null as never);

describe('MasteryService.computeAttemptScore', () => {
  it('returns 0 for an incorrect attempt regardless of difficulty or hints', () => {
    expect(mastery.computeAttemptScore(false, 3, 0)).toBe(0);
  });

  it('weighs a correct attempt by difficulty/3 with no hints', () => {
    expect(mastery.computeAttemptScore(true, 1, 0)).toBeCloseTo(1 / 3);
    expect(mastery.computeAttemptScore(true, 3, 0)).toBe(1);
  });

  it('subtracts a capped hint penalty from a correct attempt', () => {
    expect(mastery.computeAttemptScore(true, 3, 1)).toBeCloseTo(1 - 0.15);
    expect(mastery.computeAttemptScore(true, 3, 10)).toBeCloseTo(1 - 0.3); // capped at 0.3
  });
});

describe('MasteryService.computeNewMastery', () => {
  it('moves mastery halfway toward the performance score (ALPHA = 0.5)', () => {
    expect(mastery.computeNewMastery(0.3, 1 / 3)).toBeCloseTo(0.3 + 0.5 * (1 / 3 - 0.3));
  });

  it('never lets a single attempt push mastery to exactly 0 or 1 from a mid prior', () => {
    expect(mastery.computeNewMastery(0.5, 0)).toBe(0.25);
    expect(mastery.computeNewMastery(0.5, 1)).toBe(0.75);
  });

  it('clamps the result to [0, 1]', () => {
    expect(mastery.computeNewMastery(0, 0)).toBe(0);
    expect(mastery.computeNewMastery(1, 1)).toBe(1);
  });
});
