import { Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService, DEMO_STUDENT_ID } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('me')
  getMe() {
    return this.studentsService.getById(DEMO_STUDENT_ID);
  }

  @Post(':id/reset')
  reset(@Param('id') id: string) {
    return this.studentsService.resetProgress(id);
  }
}
