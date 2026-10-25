var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post } from '@nestjs/common';
import { TutorService } from './tutor.service.js';
import { TutorContextBuilderService } from './tutor-context-builder.service.js';
import { TutorFollowupDto } from './dto/tutor-followup.dto.js';
let TutorController = class TutorController {
    tutorService;
    contextBuilder;
    constructor(tutorService, contextBuilder) {
        this.tutorService = tutorService;
        this.contextBuilder = contextBuilder;
    }
    async followup(dto) {
        const context = await this.contextBuilder.build({
            studentId: dto.studentId,
            questionId: dto.questionId,
            studentAnswer: dto.studentAnswer,
            hintCount: dto.hintCount,
            tutorMode: 'followup',
        });
        return this.tutorService.followup(context, dto.priorTurn, dto.followUpMessage);
    }
};
__decorate([
    Post('followup'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TutorFollowupDto]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "followup", null);
TutorController = __decorate([
    Controller('tutor'),
    __metadata("design:paramtypes", [TutorService,
        TutorContextBuilderService])
], TutorController);
export { TutorController };
//# sourceMappingURL=tutor.controller.js.map