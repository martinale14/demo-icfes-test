import { Controller, Get, Query } from '@nestjs/common';
import { CareersService } from './careers.service.js';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get('affinity')
  getAffinity(@Query('studentId') studentId: string) {
    return this.careersService.computeAffinities(studentId);
  }
}
