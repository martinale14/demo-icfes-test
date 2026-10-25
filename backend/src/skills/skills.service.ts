import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(skillId: string) {
    const skill = await this.prisma.skill.findUnique({ where: { id: skillId } });
    if (!skill) {
      throw new NotFoundException(`Skill ${skillId} not found`);
    }
    return skill;
  }

  getAll() {
    return this.prisma.skill.findMany();
  }
}
