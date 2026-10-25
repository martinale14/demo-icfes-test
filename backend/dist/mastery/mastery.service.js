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
const ALPHA = 0.5;
const MAX_HINT_PENALTY = 0.3;
const HINT_PENALTY_PER_HINT = 0.15;
export const INITIAL_MASTERY = 0.3;
function clamp01(value) {
    return Math.min(1, Math.max(0, value));
}
let MasteryService = class MasteryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    computeAttemptScore(isCorrect, difficulty, hintCount) {
        if (!isCorrect) {
            return 0;
        }
        const difficultyWeight = difficulty / 3;
        const hintPenalty = Math.min(MAX_HINT_PENALTY, hintCount * HINT_PENALTY_PER_HINT);
        return clamp01(difficultyWeight - hintPenalty);
    }
    computeNewMastery(oldMastery, performanceScore) {
        return clamp01(oldMastery + ALPHA * (performanceScore - oldMastery));
    }
    async getCurrentMastery(studentId, skillId) {
        const state = await this.prisma.studentSkillState.findUnique({
            where: { studentId_skillId: { studentId, skillId } },
        });
        return state?.masteryProbability ?? INITIAL_MASTERY;
    }
    async updateForAttempt(params) {
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
        const newHintDependency = (state.hintDependency * priorAttempts + hintCount) / (priorAttempts + 1);
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
};
MasteryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], MasteryService);
export { MasteryService };
//# sourceMappingURL=mastery.service.js.map