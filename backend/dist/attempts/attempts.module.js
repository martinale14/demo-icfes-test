var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service.js';
import { AttemptsController } from './attempts.controller.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { MasteryModule } from '../mastery/mastery.module.js';
import { TutorModule } from '../tutor/tutor.module.js';
let AttemptsModule = class AttemptsModule {
};
AttemptsModule = __decorate([
    Module({
        imports: [QuestionsModule, MasteryModule, TutorModule],
        controllers: [AttemptsController],
        providers: [AttemptsService],
    })
], AttemptsModule);
export { AttemptsModule };
//# sourceMappingURL=attempts.module.js.map