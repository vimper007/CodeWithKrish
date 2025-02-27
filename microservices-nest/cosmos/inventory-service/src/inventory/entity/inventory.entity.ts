import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column('decimal')
    price:number;
    @Column()
    quantity:number;
}