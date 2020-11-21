import { Products } from 'src/products/products.entity';
import { Terminals } from 'src/terminals/terminals.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne
} from 'typeorm';

@Entity()
export class LoadingRates extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id : string; 

  @ManyToOne(
    type => Products,
    products => products.id
  )
  @JoinColumn({ name : 'product_id' })
  productId : Products;

  @ManyToOne(
    type => Terminals,
    terminals => terminals.id
  )
  @JoinColumn({ name : 'terminal_id' })
  terminalId : Terminals;

  @Column({ nullable: false, name : "loading_rate", type: 'bigint' })
  loadingRate : number;  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
}