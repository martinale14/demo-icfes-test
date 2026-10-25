import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service.js';
import { AttemptsController } from './attempts.controller.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { MasteryModule } from '../mastery/mastery.module.js';
import { TutorModule } from '../tutor/tutor.module.js';

@Module({
  imports: [QuestionsModule, MasteryModule, TutorModule],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
