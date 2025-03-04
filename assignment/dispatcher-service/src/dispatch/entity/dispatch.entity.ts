import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dispatch {
  @PrimaryGeneratedColumn()
  vehicleNumber: number;

  @Column()
  city: string;
}
