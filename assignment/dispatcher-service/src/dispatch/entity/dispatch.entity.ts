import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dispatch {
  @PrimaryGeneratedColumn()
  id:string;
  @Column()
  vehicleNumber: number;
  @Column()
  city: string;
}
