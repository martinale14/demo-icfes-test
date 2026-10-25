import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service.js';
import { TutorController } from './tutor.controller.js';
import { TutorContextBuilderService } from './tutor-context-builder.service.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { MasteryModule } from '../mastery/mastery.module.js';
import { KnowledgeBaseModule } from '../knowledge-base/knowledge-base.module.js';

@Module({
  imports: [QuestionsModule, MasteryModule, KnowledgeBaseModule],
  controllers: [TutorController],
  providers: [TutorService, TutorContextBuilderService],
  exports: [TutorService, TutorContextBuilderService],
})
export class TutorModule {}
