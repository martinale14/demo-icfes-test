import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { INITIAL_MASTERY } from '../mastery/mastery.service.js';

export const DEMO_STUDENT_ID = 'demo-student';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(studentId: string) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student ${studentId} not found`);
    }
    return student;
  }

  /**
   * Wipes a student's demo progress: deletes every Attempt and resets every
   * StudentSkillState back to the initial prior. Questions/Skills are
   * untouched — this is a "restart the demo", not a database reset.
   */
  async resetProgress(studentId: string) {
    await this.getById(studentId); // 404s if the student doesn't exist

    await this.prisma.attempt.deleteMany({ where: { studentId } });
    await this.prisma.studentSkillState.updateMany({
      where: { studentId },
      data: {
        masteryProbability: INITIAL_MASTERY,
        consecutiveSuccesses: 0,
        hintDependency: 0,
        lastPracticedAt: null,
      },
    });

    return { reset: true };
  }
}
