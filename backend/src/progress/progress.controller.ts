import { Controller, Get, Query } from '@nestjs/common';
import { ProgressService } from './progress.service.js';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  getProgress(@Query('studentId') studentId: string) {
    return this.progressService.getProgress(studentId);
  }
}
