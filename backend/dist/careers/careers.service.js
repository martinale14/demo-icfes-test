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
import { INITIAL_MASTERY } from '../mastery/mastery.service.js';
import { CAREER_PROFILES } from './data/career-profiles.js';
let CareersService = class CareersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async computeAffinities(studentId) {
        const states = await this.prisma.studentSkillState.findMany({
            where: { studentId },
            include: { skill: true },
        });
        const masteryBySkillCode = {};
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
};
CareersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CareersService);
export { CareersService };
//# sourceMappingURL=careers.service.js.map