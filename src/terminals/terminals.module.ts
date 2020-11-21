import { Module } from '@nestjs/common';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalsRepository } from './terminals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalsRepository])],
  providers: [TerminalsService],
  exports: [TerminalsService],
  controllers: [TerminalsController]
})
export class TerminalsModule {}
