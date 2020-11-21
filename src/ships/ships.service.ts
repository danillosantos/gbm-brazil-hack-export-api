import { Injectable } from '@nestjs/common';
import { ShipFiltersDto } from './ships.dto';
import { ShipsRepository } from './ships.repository';

import * as _ from 'lodash';
import * as moment from 'moment';
import { TerminalsService } from 'src/terminals/terminals.service';

@Injectable()
export class ShipsService {

  constructor(
    private readonly shipsRepository : ShipsRepository,
    private readonly terminalService : TerminalsService,
  ) {}

  getShips(filters? : ShipFiltersDto) {
    return this.shipsRepository.getShips(filters);
  }

  async getMooredShipsByTerminal(filters? : ShipFiltersDto) {    
    let ships = await this.shipsRepository.getShips({ status : 'moored' });
    let terminals = await this.terminalService.getTerminalsWithLastUnmooringDate();

    terminals = terminals.map((terminal:any) => {
      return {
        id : terminal.terminals_id,
        terminalName : terminal.terminals_terminal_name,
        lastOutgoingUnmooringDate : terminal.last_outgoing_unmooring_date,
        ships : []
      };
    });

    ships = this.normalizeShips(ships)

    ships.forEach(ship => {
      let foundTerminal:any = terminals.find(terminal => terminal.id == ship.terminalId.id);
      if(!foundTerminal){
        return;
      }
      foundTerminal.ships.push(ship);
    });
    return terminals;
  }

  async getInQueueShipsByTerminal(filters? : ShipFiltersDto) {
    let ships = await this.shipsRepository.getShips({ status : 'at_anchor' });
    return this.groupByTerminal(this.normalizeShips(ships));
  }

  private groupByTerminal(ships){
    const groupedByTerminal  = _.groupBy(ships, ship => ship.terminalId.terminalName );
    return Object.entries(groupedByTerminal).map(([terminalName, ships]) => {
      return {
        terminalName : terminalName,
        ships : ships
      }
    });
  }

  private normalizeShips(ships){
    return ships.map(ship => {
      ship.minimumLoadingRate = ship.loadingRate.loadingRate;
      ship.productName = ship.productId.productName;

      ship.stoppageHours = ship.stoppageHours || 0;
      ship.estimatedEndShipmentDate = '';
      
      ship.currentLoadingRate = this.calculateShipCurrentLoadingRate(ship);
      ship.estimatedEndShipmentDate = this.calculateShipEstimatedEndShipmentDate(ship);

      ship.balanceToBeShipped = ship.totalManifested - (ship.totalOnBoard || 0);

      return ship;
    });
  }

  private calculateShipCurrentLoadingRate(ship){
    if(ship.totalOnBoard && ship.startShipmentDate){
      if(!ship.endShipmentDate){
        return ship.totalOnBoard / (moment().diff(ship.startShipmentDate, 'hours', true) - ship.stoppageHours)
      }
      return ship.totalOnBoard / (moment(ship.endShipmentDate).diff(ship.startShipmentDate, 'hours', true) - ship.stoppageHours)
    }
    return 0;
  }

  private calculateShipEstimatedEndShipmentDate(ship){
    if(ship.currentLoadingRate){
      let estimatedHours = (ship.totalManifested - ship.totalOnBoard) / ship.currentLoadingRate;
      return moment().add(estimatedHours, 'hours').toDate();
    }
    return null;
  }

  getNewShip(shipData){
    let ship = this.shipsRepository.create();

    Object.assign(ship, shipData);

    ship.status = 'at_anchor';

    if(ship.incomingStartMooringDate){
      ship.status = 'moored';
    }
    if(ship.outgoingUnmooringDate){
      ship.status = 'finished';
    }
    return ship;
  }

  getSheepByDuv(duv){
    return this.shipsRepository.getShipByDuv(duv);
  }

}
