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
import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { TutorService } from '../tutor/tutor.service.js';
import { TutorContextBuilderService } from '../tutor/tutor-context-builder.service.js';
let AttemptsService = class AttemptsService {
    prisma;
    questionsService;
    masteryService;
    tutorService;
    contextBuilder;
    constructor(prisma, questionsService, masteryService, tutorService, contextBuilder) {
        this.prisma = prisma;
        this.questionsService = questionsService;
        this.masteryService = masteryService;
        this.tutorService = tutorService;
        this.contextBuilder = contextBuilder;
    }
    async submit(dto) {
        const hintCount = dto.hintCount ?? 0;
        const question = await this.questionsService.getByIdWithAnswer(dto.questionId);
        const isCorrect = dto.selectedOption === question.correctAnswer;
        const attempt = await this.prisma.attempt.create({
            data: {
                studentId: dto.studentId,
                questionId: dto.questionId,
                studentAnswer: dto.selectedOption,
                isCorrect,
                hintCount,
            },
        });
        const updatedState = await this.masteryService.updateForAttempt({
            studentId: dto.studentId,
            skillId: question.skillId,
            isCorrect,
            difficulty: question.difficulty,
            hintCount,
        });
        const context = await this.contextBuilder.build({
            studentId: dto.studentId,
            questionId: dto.questionId,
            studentAnswer: dto.selectedOption,
            hintCount,
            tutorMode: 'initial_feedback',
            masteryOverride: updatedState.masteryProbability,
        });
        const tutor = await this.tutorService.generateInitialFeedback(context);
        const nextQuestion = await this.questionsService.getNextQuestion(dto.studentId);
        return {
            attemptId: attempt.id,
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            masteryProbability: updatedState.masteryProbability,
            skillCode: question.skill.code,
            tutor,
            nextQuestion,
        };
    }
};
AttemptsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        QuestionsService,
        MasteryService,
        TutorService,
        TutorContextBuilderService])
], AttemptsService);
export { AttemptsService };
//# sourceMappingURL=attempts.service.js.map