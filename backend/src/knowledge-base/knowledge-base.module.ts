import { Module } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service.js';
import { KnowledgeBaseController } from './knowledge-base.controller.js';

@Module({
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService],
  exports: [KnowledgeBaseService],
})
export class KnowledgeBaseModule {}
