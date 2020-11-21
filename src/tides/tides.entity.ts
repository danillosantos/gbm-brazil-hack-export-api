import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class Tides extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id : string; 

  @Column({ nullable: true, name : "date", type: 'date' })
  date : Date;

  @Column({ nullable: false, name : "period", type: 'jsonb' })
  period : Object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
}