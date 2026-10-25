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

@Module({
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
export class AppModule {}
