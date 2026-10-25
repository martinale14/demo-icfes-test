import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service.js';
import { ProgressController } from './progress.controller.js';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
