import { Module } from '@nestjs/common';
import { MasteryService } from './mastery.service.js';

@Module({
  providers: [MasteryService],
  exports: [MasteryService],
})
export class MasteryModule {}
