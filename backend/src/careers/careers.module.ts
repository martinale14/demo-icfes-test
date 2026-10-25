import { Module } from '@nestjs/common';
import { CareersService } from './careers.service.js';
import { CareersController } from './careers.controller.js';

@Module({
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}
