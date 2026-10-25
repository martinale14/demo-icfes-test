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
import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { KnowledgeBaseService } from '../knowledge-base/knowledge-base.service.js';
let TutorContextBuilderService = class TutorContextBuilderService {
    questionsService;
    masteryService;
    knowledgeBaseService;
    constructor(questionsService, masteryService, knowledgeBaseService) {
        this.questionsService = questionsService;
        this.masteryService = masteryService;
        this.knowledgeBaseService = knowledgeBaseService;
    }
    async build(params) {
        const question = await this.questionsService.getByIdWithAnswer(params.questionId);
        const studentMastery = params.masteryOverride ??
            (await this.masteryService.getCurrentMastery(params.studentId, question.skillId));
        const ragSnippets = this.knowledgeBaseService.retrieve(question.skill.code);
        return {
            subject: 'ICFES Saber 11',
            skill: question.skill.name,
            learningGoal: question.skill.description,
            studentMastery,
            currentQuestion: {
                enunciado: question.enunciado,
                difficulty: question.difficulty,
                options: {
                    A: question.optionA,
                    B: question.optionB,
                    C: question.optionC,
                    D: question.optionD,
                },
                correctAnswer: question.correctAnswer,
                explanation: question.explanation,
            },
            studentAnswer: params.studentAnswer,
            hintCount: params.hintCount,
            tutorMode: params.tutorMode,
            ragSnippets,
        };
    }
};
TutorContextBuilderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [QuestionsService,
        MasteryService,
        KnowledgeBaseService])
], TutorContextBuilderService);
export { TutorContextBuilderService };
//# sourceMappingURL=tutor-context-builder.service.js.map