import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { INITIAL_MASTERY } from '../mastery/mastery.service.js';
import { CAREER_PROFILES } from './data/career-profiles.js';
import { CareerAffinityDto } from './dto/career-affinity.dto.js';

@Injectable()
export class CareersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Deterministic affinity score per career: a weighted average of the student's
   * mastery per skill, weighted by how relevant each skill is to that career.
   * No LLM involved — same "server computes the facts" principle as MasteryService.
   */
  async computeAffinities(studentId: string): Promise<CareerAffinityDto[]> {
    const states = await this.prisma.studentSkillState.findMany({
      where: { studentId },
      include: { skill: true },
    });

    const masteryBySkillCode: Record<string, number> = {};
    for (const state of states) {
      masteryBySkillCode[state.skill.code] = state.masteryProbability;
    }

    const scored = CAREER_PROFILES.map((career) => {
      const weightEntries = Object.entries(career.weights);
      const weightedSum = weightEntries.reduce((sum, [skillCode, weight]) => {
        const mastery = masteryBySkillCode[skillCode] ?? INITIAL_MASTERY;
        return sum + mastery * weight;
      }, 0);
      const totalWeight = weightEntries.reduce((sum, [, weight]) => sum + weight, 0);

      return {
        code: career.code,
        name: career.name,
        description: career.description,
        affinityScore: Math.round((weightedSum / totalWeight) * 100),
      };
    });

    return scored
      .sort((a, b) => b.affinityScore - a.affinityScore)
      .map((career, index) => ({ ...career, rank: index + 1 }));
  }
}
