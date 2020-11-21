import { EntityRepository, Repository, getConnection, ILike } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Terminals } from './terminals.entity';
import { Ships } from 'src/ships/ships.entity';

@Injectable()
@EntityRepository(Terminals)
export class TerminalsRepository extends Repository<Terminals> {

  constructor() {
    super();
  } 

  async getTerminals() {
    return this.find({});
  }

  async getTerminalsWithLastUnmooringDate() {
    let subQuery = getConnection()
      .createQueryBuilder()
      .select('ships.outgoing_unmooring_date', 'last_outgoing_unmooring_date')
      .from(Ships, 'ships')
      .orderBy({ 'outgoing_unmooring_date' : { order : 'DESC', nulls : 'NULLS LAST' } })
      .limit(1)
      .getQuery();

    return await getConnection()
      .createQueryBuilder()
      .select('terminals')
      .addSelect(`(${subQuery})`, "last_outgoing_unmooring_date")
      .from(Terminals, 'terminals')
      .orderBy("terminals.terminalName", "ASC")
      .getRawMany()
  }

  getTerminalsRanking(){
    return getConnection().query(`
      select terminals.terminal_name, coalesce(aggregation.adherence, 0) as adherence, coalesce(aggregation.total_boarded, 0) as total_boarded
      from terminals
      left join(
        select 
          avg(current_loading_rate / minimum_loading_rate) as adherence,
          sum(total_on_board) as total_boarded,
          terminal_id
        from (
          select 
            total_on_board / (EXTRACT(EPOCH FROM coalesce(end_shipment_date, now()) - start_shipment_date )/3600) as current_loading_rate,
            (select loading_rate from loading_rates lr where product_id = ships.product_id and terminal_id = ships.terminal_id) as minimum_loading_rate,
            total_on_board,
            terminal_id 
          from ships
        ) r
        group by r.terminal_id
      ) aggregation
      on aggregation.terminal_id = terminals.id
    `);
  }

  getGeneralTotalBoarded(){
    return getConnection().query(`
      select coalesce(sum(total_on_board), 0) as general_total_boarded
      from ships
    `);
  }

  async getTerminalByName(terminalName) {
    return this.findOne({
      terminalName : ILike(terminalName)
    })
  }


}