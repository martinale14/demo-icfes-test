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
import { Controller, Get, Query } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service.js';
let KnowledgeBaseController = class KnowledgeBaseController {
    knowledgeBaseService;
    constructor(knowledgeBaseService) {
        this.knowledgeBaseService = knowledgeBaseService;
    }
    getHint(skillCode, hintNumber) {
        const hint = this.knowledgeBaseService.getHint(skillCode, Number(hintNumber));
        return { hint };
    }
};
__decorate([
    Get('hint'),
    __param(0, Query('skillCode')),
    __param(1, Query('hintNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], KnowledgeBaseController.prototype, "getHint", null);
KnowledgeBaseController = __decorate([
    Controller('knowledge-base'),
    __metadata("design:paramtypes", [KnowledgeBaseService])
], KnowledgeBaseController);
export { KnowledgeBaseController };
//# sourceMappingURL=knowledge-base.controller.js.map