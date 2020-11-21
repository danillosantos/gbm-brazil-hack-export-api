import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class Products extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id : string; 

  @Column({ nullable: false, name : "product_name", type: 'varchar' })
  productName : string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
}