import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation
} from '@nestjs/swagger';

import { ErrorHandling } from '../config/Error';
import { LoadingRatesService } from './loading-rates.service';

@Controller('loadingRates')
export class LoadingRatesController {

  constructor(
    private readonly LoadingRatesService: LoadingRatesService,
    ) {}

  @ApiOperation({ summary: 'get loadingRates' })
  @Get()
  async getLoadingRates() {
    try {
      return this.LoadingRatesService.getLoadingRates();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

}
