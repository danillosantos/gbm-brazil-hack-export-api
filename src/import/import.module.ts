import { Module } from '@nestjs/common';
import { OrmTransactionsModule } from 'src/orm-transactions/orm-transactions.module';
import { ProductsModule } from 'src/products/products.module';
import { ShipsModule } from 'src/ships/ships.module';
import { TerminalsController } from 'src/terminals/terminals.controller';
import { TerminalsModule } from 'src/terminals/terminals.module';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';

@Module({
  imports : [ShipsModule, ProductsModule, TerminalsModule, OrmTransactionsModule],
  controllers: [ImportController],
  providers: [ImportService]
})
export class ImportModule {}
