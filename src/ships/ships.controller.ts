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
import { ShipsService } from './ships.service';

@Controller('ships')
export class ShipsController {

  constructor(
    private readonly ShipsService: ShipsService,
    ) {}

  @ApiOperation({ summary: 'get ships' })
  @Get()
  async getShips() {
    try {
      return this.ShipsService.getShips();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'get moored ships' })
  @Get('/moored')
  async getMooredShipsByTerminal() {
    try {
      return this.ShipsService.getMooredShipsByTerminal();
    } catch (error) {
      new ErrorHandling(error);
    }
  } 

  @ApiOperation({ summary: 'get ships in queue' })
  @Get('/queue')
  async getInQueueShipsByTerminal() {
    try {
      return this.ShipsService.getInQueueShipsByTerminal();
    } catch (error) {
      new ErrorHandling(error);
    }
  }


}
