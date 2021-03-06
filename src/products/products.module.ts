import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
