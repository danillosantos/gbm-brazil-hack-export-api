import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoadingRates } from './loading-rates.entity';

@Injectable()
@EntityRepository(LoadingRates)
export class LoadingRatesRepository extends Repository<LoadingRates> {

  constructor() {
    super();
  }


  async getLoadingRates() {
    return this.find({});
  }


}