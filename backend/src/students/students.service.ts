import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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
}
