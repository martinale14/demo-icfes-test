import { Controller, Get } from '@nestjs/common';
import { StudentsService, DEMO_STUDENT_ID } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('me')
  getMe() {
    return this.studentsService.getById(DEMO_STUDENT_ID);
  }
}
