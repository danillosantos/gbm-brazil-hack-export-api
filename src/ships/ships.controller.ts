import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Request
} from '@nestjs/common';

import {
  ApiTags,
  ApiBody,
  ApiOperation
} from '@nestjs/swagger';

import { ErrorHandling } from '../config/Error';
import { ShipFiltersDto } from './ships.dto';
import { ShipsService } from './ships.service';

@Controller('ships')
export class ShipsController {

  constructor(
    private readonly ShipsService: ShipsService,
    ) {}

  @ApiOperation({ summary: 'get moored ships' })
  @Get('/moored')
  async getMooredShipsByTerminal(@Query() filters : ShipFiltersDto) {
    try {
      return this.ShipsService.getMooredShipsByTerminal(filters);
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'get ships' })
  @Get('/queue')
  async getInQueueShipsByTerminal(@Query() filters : ShipFiltersDto) {
    try {
      return this.ShipsService.getInQueueShipsByTerminal(filters);
    } catch (error) {
      new ErrorHandling(error);
    }
  }


}
