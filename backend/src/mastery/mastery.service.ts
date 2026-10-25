import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

const ALPHA = 0.5;
const MAX_HINT_PENALTY = 0.3;
const HINT_PENALTY_PER_HINT = 0.15;
export const INITIAL_MASTERY = 0.3;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

@Injectable()
export class MasteryService {
  constructor(private readonly prisma: PrismaService) {}

  /** Weighted performance score (0-1) for a single attempt — no BKT, just difficulty + hint usage. */
  computeAttemptScore(isCorrect: boolean, difficulty: number, hintCount: number): number {
    if (!isCorrect) {
      return 0;
    }
    const difficultyWeight = difficulty / 3;
    const hintPenalty = Math.min(MAX_HINT_PENALTY, hintCount * HINT_PENALTY_PER_HINT);
    return clamp01(difficultyWeight - hintPenalty);
  }

  /** Exponential moving average so a single attempt never swings mastery to 0 or 1. */
  computeNewMastery(oldMastery: number, performanceScore: number): number {
    return clamp01(oldMastery + ALPHA * (performanceScore - oldMastery));
  }

  async getCurrentMastery(studentId: string, skillId: string): Promise<number> {
    const state = await this.prisma.studentSkillState.findUnique({
      where: { studentId_skillId: { studentId, skillId } },
    });
    return state?.masteryProbability ?? INITIAL_MASTERY;
  }

  async updateForAttempt(params: {
    studentId: string;
    skillId: string;
    isCorrect: boolean;
    difficulty: number;
    hintCount: number;
  }) {
    const { studentId, skillId, isCorrect, difficulty, hintCount } = params;

    const state = await this.prisma.studentSkillState.upsert({
      where: { studentId_skillId: { studentId, skillId } },
      update: {},
      create: { studentId, skillId, masteryProbability: INITIAL_MASTERY },
    });

    const priorAttempts = await this.prisma.attempt.count({
      where: { studentId, question: { skillId } },
    });

    const performanceScore = this.computeAttemptScore(isCorrect, difficulty, hintCount);
    const newMastery = this.computeNewMastery(state.masteryProbability, performanceScore);
    const newConsecutiveSuccesses = isCorrect ? state.consecutiveSuccesses + 1 : 0;
    const newHintDependency =
      (state.hintDependency * priorAttempts + hintCount) / (priorAttempts + 1);

    return this.prisma.studentSkillState.update({
      where: { studentId_skillId: { studentId, skillId } },
      data: {
        masteryProbability: newMastery,
        consecutiveSuccesses: newConsecutiveSuccesses,
        hintDependency: newHintDependency,
        lastPracticedAt: new Date(),
      },
    });
  }
}
