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
import { TerminalsService } from './terminals.service';

@Controller('terminals')
export class TerminalsController {

  constructor(
    private readonly TerminalsService: TerminalsService,
    ) {}

  @ApiOperation({ summary: 'get terminals' })
  @Get()
  async getTerminals() {
    try {
      return this.TerminalsService.getTerminals();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'get terminals ranking' })
  @Get('/ranking')
  async getTerminalsRanking() {
    try {
      return this.TerminalsService.getTerminalsRanking();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'get terminals ranking' })
  @Get('/general-total-boarded')
  async getGeneralTotalBoarded() {
    try {
      return this.TerminalsService.getGeneralTotalBoarded();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

}
