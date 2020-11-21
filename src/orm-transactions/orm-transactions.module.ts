import { Module } from '@nestjs/common';
import { OrmTransactionsService } from './orm-transactions.service';

@Module({
  providers: [OrmTransactionsService],
  exports : [OrmTransactionsService]
})
export class OrmTransactionsModule {}
