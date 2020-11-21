import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsModule } from './ships/ships.module';
import { TerminalsModule } from './terminals/terminals.module';
import { TidesModule } from './tides/tides.module';
import { OrmTransactionsModule } from './orm-transactions/orm-transactions.module';
import { ImportModule } from './import/import.module';
import { ProductsModule } from './products/products.module';
import { LoadingRatesModule } from './loading-rates/loading-rates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ShipsModule,
    TerminalsModule,
    TidesModule,
    OrmTransactionsModule,
    ImportModule,
    ProductsModule,
    LoadingRatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
