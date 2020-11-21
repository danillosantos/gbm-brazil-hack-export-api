import { Module } from '@nestjs/common';
import { TidesService } from './tides.service';
import { TidesController } from './tides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TidesRepository } from './tides.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TidesRepository])],
  providers: [TidesService],
  exports: [TidesService],
  controllers: [TidesController]
})
export class TidesModule {}
