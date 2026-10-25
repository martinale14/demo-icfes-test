var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProgressService = class ProgressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProgress(studentId) {
        const states = await this.prisma.studentSkillState.findMany({
            where: { studentId },
            include: { skill: true },
        });
        return {
            skills: await Promise.all(states.map(async (state) => ({
                skillCode: state.skill.code,
                skillName: state.skill.name,
                masteryProbability: state.masteryProbability,
                consecutiveSuccesses: state.consecutiveSuccesses,
                attempts: await this.prisma.attempt.count({
                    where: { studentId, question: { skillId: state.skillId } },
                }),
            }))),
        };
    }
};
ProgressService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProgressService);
export { ProgressService };
//# sourceMappingURL=progress.service.js.map