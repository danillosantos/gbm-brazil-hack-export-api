import { Injectable } from '@nestjs/common';
import { OrmTransactionsService } from 'src/orm-transactions/orm-transactions.service';
import { ProductsService } from 'src/products/products.service';
import { ShipsService } from 'src/ships/ships.service';
import { TerminalsService } from 'src/terminals/terminals.service';

import * as XLSX from 'XLSX';
import * as moment from 'moment';

@Injectable()
export class ImportService {

  constructor(
    private readonly shipsService: ShipsService,
    private readonly productsService: ProductsService,
    private readonly terminalService: TerminalsService,
    private readonly ormTransactionsService: OrmTransactionsService
  ){
  }

  async processSheet(file, body){

    let workbook = this.readSheetFile(file);
    let shipRows = this.sheetToJson(workbook);    
    
    console.log('shipRows', shipRows);

    shipRows = await this.getTerminalsAndProductsAndDuvs(shipRows);

    let ships = shipRows.map(this.mapRowToship.bind(this));

    await this.ormTransactionsService.saveAll(ships);
    
  }

  private readSheetFile(file){
    return XLSX.read(file.buffer, { type:"buffer", cellDates:true});
  }

  private sheetToJson(workbook){
    return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  }

  private mapRowToship(sheetRow){
    let shipData:any = {};
    
    shipData.productId = sheetRow.productId;
    shipData.terminalId = sheetRow.terminalId;
    shipData.duv = sheetRow['Número do DUV'];
    shipData.shipName = sheetRow['Nome do Navio'];    
    shipData.atAnchorStartDate = this.parseDate(sheetRow['Data Entrada Fundeio']);
    shipData.incomingSuperviaDate = this.parseDate(sheetRow['Supervia1']);
    shipData.incomingPspDate = this.parseDate(sheetRow['PSP1']);
    shipData.incomingTugboatDate = this.parseDate(sheetRow['REBOCADOR1']);
    shipData.incomingMaritimePilotDate = this.parseDate(sheetRow['PRÁTICO1']);
    shipData.incomingStartMooringCheckDate = this.parseDate(sheetRow['AMARRADOR1']);
    shipData.incomingStartMooringDate = this.parseDate(sheetRow['INÍCIO AMARRAÇÃO']);
    shipData.incomingEndMooringDate = this.parseDate(sheetRow['FIM AMARRAÇÃO']);
    shipData.incomingMooringDate = this.parseDate(sheetRow['Atracação Efetiva']);
    shipData.estimatedMooringDate = this.parseDate(sheetRow['Atracação Prevista']);
    shipData.startShipmentDate = this.parseDate(sheetRow['Início Embarque']);
    shipData.endShipmentDate = this.parseDate(sheetRow['Término de Embarque']);
    shipData.stoppageHours = sheetRow['Paradas Operacionais Excludentes'];
    shipData.startFumigationDate = this.parseDate(sheetRow['INÍCIO FUMIGAÇÃO']);
    shipData.endFumigationDate = this.parseDate(sheetRow['FIM FUMIGAÇÃO']);
    shipData.outgoingSuperviaDate = this.parseDate(sheetRow['Supervia2']);
    shipData.outgoingPspDate = this.parseDate(sheetRow['PSP2']);
    shipData.outgoingTugboatDate = this.parseDate(sheetRow['REBOCADOR2']);
    shipData.outgoingMaritimePilotDate = this.parseDate(sheetRow['PRÁTICO2']);
    shipData.outgoingStartUnmooringDate = this.parseDate(sheetRow['INÍCIO DESAMARRAÇÃO']);
    shipData.outgoingEndUnmooringDate = this.parseDate(sheetRow['FIM DESAMARRAÇÃO']);
    shipData.outgoingUnmooringDate = this.parseDate(sheetRow['Desatracação Efetiva']);
    shipData.estimatedUnmooringDate = this.parseDate(sheetRow['Desatracação Prevista']);
    shipData.atAnchorEndDate = this.parseDate(sheetRow['Data Saída Fundeio']);
    shipData.totalManifested = sheetRow['Manifestado'];
    shipData.totalOnBoard = sheetRow['Embarcado'];

    if(sheetRow.id){
      shipData.id = sheetRow.id
    }
    
    //shipData.todo = sheetRow['Porto de estadia atual'];
    //shipData.todo = sheetRow['Motivo do Fundeio'];    
    //shipData.todo = sheetRow['Tipo de Embarcação'];
    //shipData.todo = sheetRow['Tipo de Viagem Chegada'];
    //shipData.todo = sheetRow['Tipo de Viagem Chegada_1'];
    return this.shipsService.getNewShip(shipData);
  }

  private parseDate(dateString){
    if(moment().utcOffset() == 0){ //fixed xlsx library bug
      return moment(dateString).add(3, 'hours').toDate(); //this will cause problems if it's necessary to support multiple timezones in the future
    }
    return dateString;
  }

  async getTerminalsAndProductsAndDuvs(shipRows){
    let terminals = {},
      products = {};
    
    for(let shipRow of shipRows){
      const productName = shipRow['Produto']
      const terminalName = shipRow['Local(is) Atracação (área do porto > berço > cabeço)'];
      
      if(!products[productName]){
        products[productName] = await this.productsService.getProductByName(productName)
      }

      if(!terminals[terminalName]){
        terminals[terminalName] = await this.terminalService.getTerminalByName(terminalName)
      }
      let existentShip = await this.shipsService.getSheepByDuv(shipRow['Número do DUV']);

      if(existentShip && existentShip.id){
        shipRow.id = existentShip.id;
      }

      shipRow.productId = products[productName];
      shipRow.terminalId = terminals[terminalName];
    }

    return shipRows;
  }
}
