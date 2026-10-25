var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { StudentsModule } from './students/students.module.js';
import { SkillsModule } from './skills/skills.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { MasteryModule } from './mastery/mastery.module.js';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module.js';
import { TutorModule } from './tutor/tutor.module.js';
import { AttemptsModule } from './attempts/attempts.module.js';
import { ProgressModule } from './progress/progress.module.js';
import { CareersModule } from './careers/careers.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            StudentsModule,
            SkillsModule,
            QuestionsModule,
            MasteryModule,
            KnowledgeBaseModule,
            TutorModule,
            AttemptsModule,
            ProgressModule,
            CareersModule,
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map