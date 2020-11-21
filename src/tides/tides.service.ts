import { Injectable } from '@nestjs/common';
import { TidesRepository } from './tides.repository';

@Injectable()
export class TidesService {

  constructor(
    private readonly TidesRepository : TidesRepository,
  ) {}

  getTides() {
    return this.TidesRepository.getTides();
  }


}
