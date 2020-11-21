import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsRepository } from './ships.repository';
import { TerminalsModule } from 'src/terminals/terminals.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShipsRepository]), TerminalsModule],
  providers: [ShipsService],
  exports: [ShipsService],
  controllers: [ShipsController]
})
export class ShipsModule {}
