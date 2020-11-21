import { Products } from 'src/products/products.entity';
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

import { Terminals } from '../terminals/terminals.entity';

@Entity()
export class Ships extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({ nullable: false, name : "ship_name", type: 'varchar' })
  shipName : string; //nome do navio

  @Column({ nullable: false, name : "duv", type: 'varchar' })
  duv : string; //documento unico virtual

  @Column({ nullable: true, name : "total_manifested", type: 'double precision' })
  totalManifested : number; //total manifestado
  
  @Column({ nullable: true, name : "total_on_board", type: 'double precision' })
  totalOnBoard : number; //total embarcado  
  
  @Column({ nullable: true, name : "draught", type: 'double precision' })
  draught : number; //calado
  
  @Column({ nullable: true, name : "start_shipment_date", type: 'timestamp with time zone' })
  startShipmentDate : Date; //Data de inicio de carregamento/embarque

  @Column({ nullable: true, name : "end_shipment_date", type: 'timestamp with time zone' })
  endShipmentDate : Date; //Data do termino de carregamento  
  
  @Column({ nullable: true, name : "estimated_unmooring_date", type: 'timestamp with time zone' })
  estimatedUnmooringDate : Date; //Data de previsão de desatracação

  @Column({ nullable: true, name : "at_anchor_start_date", type: 'timestamp with time zone' })
  atAnchorStartDate : Date; //Data de entrada de fundeio

  @Column({ nullable: true, name : "at_anchor_end_date", type: 'timestamp with time zone' })
  atAnchorEndDate : Date; //Data de saída fundeio

  @Column({ nullable: true, name : "incoming_supervia_date", type: 'timestamp with time zone' })
  incomingSuperviaDate : Date;

  @Column({ nullable: true, name : "incoming_psp_date", type: 'timestamp with time zone' })
  incomingPspDate : Date;  

  @Column({ nullable: true, name : "start_fumigation_date", type: 'timestamp with time zone' })
  startFumigationDate : Date; //data de inicio de fumigação

  @Column({ nullable: true, name : "end_fumigation_date", type: 'timestamp with time zone' })
  endFumigationDate : Date; //data de fim de fumigação

  @Column({ nullable: true, name : "incoming_tugboat_date", type: 'timestamp with time zone' })
  incomingTugboatDate : Date; //data do rebocador de atracação

  @Column({ nullable: true, name : "incoming_maritime_pilot_date", type: 'timestamp with time zone' })
  incomingMaritimePilotDate : Date; //data do prático de atracação

  @Column({ nullable: true, name : "incoming_start_mooring_check_date", type: 'timestamp with time zone' })
  incomingStartMooringCheckDate : Date; //Data de confirmação da empresa amarrador

  @Column({ nullable: true, name : "incoming_start_mooring_date", type: 'timestamp with time zone' })
  incomingStartMooringDate : Date; //Data de inicio da amarração

  @Column({ nullable: true, name : "incoming_end_mooring_date", type: 'timestamp with time zone' })
  incomingEndMooringDate : Date; //Data de fim da amarração

  @Column({ nullable: true, name : "incoming_mooring_date", type: 'timestamp with time zone' })
  incomingMooringDate : Date; //Data de atracação

  @Column({ nullable: true, name : "estimated_mooring_date", type: 'timestamp with time zone' })
  estimatedMooringDate : Date; //Data de previsão de atracação

  @Column({ nullable: true, name : "outgoing_supervia_date", type: 'timestamp with time zone' })
  outgoingSuperviaDate : Date;

  @Column({ nullable: true, name : "outgoing_psp_date", type: 'timestamp with time zone' })
  outgoingPspDate : Date;  

  @Column({ nullable: true, name : "outgoing_tugboat_date", type: 'timestamp with time zone' })
  outgoingTugboatDate : Date; //data do rebocador de desatracação

  @Column({ nullable: true, name : "outgoing_maritime_pilot", type: 'timestamp with time zone' })
  outgoingMaritimePilotDate : Date; //data do prático de desatracação

  @Column({ nullable: true, name : "outgoing_start_unmooring_date", type: 'timestamp with time zone' })
  outgoingStartUnmooringDate : Date; //data de inicio desamarração

  @Column({ nullable: true, name : "outgoing_end_unmooring_date", type: 'timestamp with time zone' })
  outgoingEndUnmooringDate : Date; //data de fim desamarração

  @Column({ nullable: true, name : "outgoing_unmooring_date", type: 'timestamp with time zone' })
  outgoingUnmooringDate : Date; //data de desatracação
  
  @Column({ nullable: true, name : "stoppage_hours", type: 'double precision' })
  stoppageHours : Number; //numero de horas de paradas operacionais excludentes
  

  @Column({ nullable: false, type: 'varchar' })
  status : 'at_anchor' | 'moored' | 'finished';

  @ManyToOne(
    type => Terminals,
    terminals => terminals.id
  )
  @JoinColumn({ name : 'terminal_id' })
  terminalId : Terminals;

  @ManyToOne(
    type => Products,
    terminals => terminals.id
  )
  @JoinColumn({ name : 'product_id' })
  productId : Products;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
}