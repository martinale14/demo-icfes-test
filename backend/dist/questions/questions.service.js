var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let QuestionsService = class QuestionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getNextQuestion(studentId) {
        const answeredQuestionIds = (await this.prisma.attempt.findMany({
            where: { studentId },
            select: { questionId: true },
        })).map((a) => a.questionId);
        const [next, totalQuestions] = await Promise.all([
            this.prisma.question.findFirst({
                where: { id: { notIn: answeredQuestionIds } },
                orderBy: { order: 'asc' },
                include: { skill: true },
            }),
            this.prisma.question.count(),
        ]);
        return next ? this.toPublicDto(next, totalQuestions) : null;
    }
    async getByIdWithAnswer(questionId) {
        const question = await this.prisma.question.findUnique({
            where: { id: questionId },
            include: { skill: true },
        });
        if (!question) {
            throw new NotFoundException(`Question ${questionId} not found`);
        }
        return question;
    }
    toPublicDto(question, totalQuestions) {
        return {
            id: question.id,
            order: question.order,
            totalQuestions,
            skillCode: question.skill.code,
            enunciado: question.enunciado,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            difficulty: question.difficulty,
        };
    }
};
QuestionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], QuestionsService);
export { QuestionsService };
//# sourceMappingURL=questions.service.js.map