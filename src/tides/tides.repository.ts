import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Tides } from './tides.entity';

@Injectable()
@EntityRepository(Tides)
export class TidesRepository extends Repository<Tides> {

  constructor() {
    super();
  }


  async getTides() {
    return this.find({});
  }


}