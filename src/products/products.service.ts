import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

  constructor(
    private readonly ProductsRepository : ProductsRepository,
  ) {}

  getProducts() {
    return this.ProductsRepository.getProducts();
  }

  getProductByName(productName){
    return this.ProductsRepository.getProductByName(productName);
  }


}
