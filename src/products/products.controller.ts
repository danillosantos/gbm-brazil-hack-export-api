import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation
} from '@nestjs/swagger';

import { ErrorHandling } from '../config/Error';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly ProductsService: ProductsService,
    ) {}

  @ApiOperation({ summary: 'get products' })
  @Get()
  async getProducts() {
    try {
      return this.ProductsService.getProducts();
    } catch (error) {
      new ErrorHandling(error);
    }
  }

}
