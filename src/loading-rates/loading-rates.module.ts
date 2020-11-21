import { Module } from '@nestjs/common';
import { LoadingRatesService } from './loading-rates.service';
import { LoadingRatesController } from './loading-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadingRatesRepository } from './loading-rates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoadingRatesRepository])],
  providers: [LoadingRatesService],
  exports: [LoadingRatesService],
  controllers: [LoadingRatesController]
})
export class LoadingRatesModule {}
