import { Body, Controller, Post } from '@nestjs/common';
import { AttemptsService } from './attempts.service.js';
import { CreateAttemptDto } from './dto/create-attempt.dto.js';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  submit(@Body() dto: CreateAttemptDto) {
    return this.attemptsService.submit(dto);
  }
}
