import { Controller, Get, Query } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service.js';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Get('hint')
  getHint(@Query('skillCode') skillCode: string, @Query('hintNumber') hintNumber: string) {
    const hint = this.knowledgeBaseService.getHint(skillCode, Number(hintNumber));
    return { hint };
  }
}
