import { EntityRepository, Repository, getConnection, FindOperator, ILike  } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Products } from './products.entity';

@Injectable()
@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {

  constructor() {
    super();
  }


  async getProducts(filters?) {
    return this.find({
      where : filters
    }); 
  }

  async getProductByName(productName) {
    return this.findOne({
      productName : ILike(productName)
    })
  }


}