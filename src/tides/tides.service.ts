import { Injectable } from '@nestjs/common';
import { TidesRepository } from './tides.repository';

import axios from 'axios';


@Injectable()
export class TidesService {

  constructor(
    private readonly TidesRepository : TidesRepository,
  ) {}

  getTides() {
    return this.TidesRepository.getTides();
  }

  async getWeather(){
    let response = await axios.get('http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3675/hours/72?token=80f22e468c05e15b8fabdee485955aa3');
    return response.data;
  }

}
