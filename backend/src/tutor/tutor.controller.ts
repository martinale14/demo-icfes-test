import { Body, Controller, Post } from '@nestjs/common';
import { TutorService } from './tutor.service.js';
import { TutorContextBuilderService } from './tutor-context-builder.service.js';
import { TutorFollowupDto } from './dto/tutor-followup.dto.js';

@Controller('tutor')
export class TutorController {
  constructor(
    private readonly tutorService: TutorService,
    private readonly contextBuilder: TutorContextBuilderService,
  ) {}

  @Post('followup')
  async followup(@Body() dto: TutorFollowupDto) {
    const context = await this.contextBuilder.build({
      studentId: dto.studentId,
      questionId: dto.questionId,
      studentAnswer: dto.studentAnswer,
      hintCount: dto.hintCount,
      tutorMode: 'followup',
    });

    return this.tutorService.followup(context, dto.priorTurn, dto.followUpMessage);
  }
}
