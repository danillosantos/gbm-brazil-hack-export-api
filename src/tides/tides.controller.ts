import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation
} from '@nestjs/swagger';

import { ErrorHandling } from '../config/Error';
import { TidesService } from './tides.service';

@Controller('tides')
export class TidesController {

  constructor(
    private readonly TidesService: TidesService,
    ) {}

  @ApiOperation({ summary: 'get tides' })
  @Get()
  async getTides() {
    try {
      return this.TidesService.getTides();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

}
