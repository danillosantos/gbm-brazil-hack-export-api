import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class Terminals extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({ nullable: false, name : "terminal_name", type: 'varchar' })
  terminalName : string;

  @Column({ nullable: true, name : "sequence", type: 'int' })
  sequence : string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
}