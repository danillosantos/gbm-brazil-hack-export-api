import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Ships } from './ships.entity';
import { LoadingRates } from 'src/loading-rates/loading-rates.entity';

@Injectable()
@EntityRepository(Ships)
export class ShipsRepository extends Repository<Ships> {

  constructor() {
    super();
  }

  async createShip(shipData, isTransaction? : Boolean) {
    
    const ship = this.getNewShip();

    Object.assign(ship, shipData);

    if (!isTransaction) {
      await ship.save();
    }

    return ship;
  }

  getNewShip(){
    return this.create();
  }

  getShipByDuv(duv){
    return this.findOne({
      duv : duv
    })
  }

  
  async getShips(filters? : any) {
    const options: any = { parameters: {} };   

    if (filters && filters.status) {
      options.query = ` status = :status `;
      options.parameters.status = filters.status;
    }

    return await getConnection()
      .createQueryBuilder()
      .select('ships')
      .from(Ships, 'ships')
      .leftJoinAndSelect("ships.terminalId", "terminals")
      .leftJoinAndSelect("ships.productId", "products")
      .innerJoinAndMapOne("ships.loadingRate", LoadingRates, 'loadingRate', 'ships.terminalId = loadingRate.terminalId and ships.productId = loadingRate.productId')
      .where(options.query, options.parameters)
      .orderBy("ships.updated_at", "DESC")
      .getMany();

  }

}