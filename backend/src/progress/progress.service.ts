import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async getProgress(studentId: string) {
    const states = await this.prisma.studentSkillState.findMany({
      where: { studentId },
      include: { skill: true },
    });

    return {
      skills: await Promise.all(
        states.map(async (state) => ({
          skillCode: state.skill.code,
          skillName: state.skill.name,
          masteryProbability: state.masteryProbability,
          consecutiveSuccesses: state.consecutiveSuccesses,
          attempts: await this.prisma.attempt.count({
            where: { studentId, question: { skillId: state.skillId } },
          }),
        })),
      ),
    };
  }
}
