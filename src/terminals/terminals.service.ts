import { Injectable } from '@nestjs/common';
import { TerminalsRepository } from './terminals.repository';

@Injectable()
export class TerminalsService {

  constructor(
    private readonly TerminalsRepository : TerminalsRepository,
  ) {}  

  getTerminals() {
    return this.TerminalsRepository.getTerminals();
  }

  getTerminalsWithLastUnmooringDate() {
    return this.TerminalsRepository.getTerminalsWithLastUnmooringDate();
  }

  getTerminalsRanking() {
    return this.TerminalsRepository.getTerminalsRanking();
  }

  async getGeneralTotalBoarded() {
    let result = await this.TerminalsRepository.getGeneralTotalBoarded();    
    return {
      generalTotalBoarded : result[0].general_total_boarded
    }
  }

  getTerminalByName(terminalName){
    return this.TerminalsRepository.getTerminalByName(terminalName);
  }
  


}
