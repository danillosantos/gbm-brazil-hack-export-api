import { Injectable } from '@nestjs/common';
import { LoadingRatesRepository } from './loading-rates.repository';

@Injectable()
export class LoadingRatesService {

  constructor(
    private readonly LoadingRatesRepository : LoadingRatesRepository,
  ) {}

  getLoadingRates() {
    return this.LoadingRatesRepository.getLoadingRates();
  }


}
