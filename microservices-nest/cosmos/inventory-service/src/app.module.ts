import { Module } from '@nestjs/common';
import { Column } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory/entity/inventory.entity';
import { InventoryModule } from './inventory/inventory.module';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:'mysql',
            host:process.env.HOSTNAME || 'localhost',
            port:3306,
            username:'root',
            password:'',
            database:'cosmos',
            entities:[Inventory],
            synchronize:true //not in prod only dev
        }),
        InventoryModule,
    ]
})
export class AppModule {
}

