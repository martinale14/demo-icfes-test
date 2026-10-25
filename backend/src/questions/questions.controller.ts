import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('next')
  getNext(@Query('studentId') studentId: string) {
    return this.questionsService.getNextQuestion(studentId);
  }
}
