import { Injectable, OnModuleInit } from '@nestjs/common';
import {Kafka} from 'kafkajs'
@Injectable()
export class NotificationService implements OnModuleInit{
    // private readonly kafka = new Kafka({brokers:['localhost:9092']})
    private readonly kafka = new Kafka({brokers: ["3.0.159.213:9092"]});
    private readonly consumer = this.kafka.consumer({groupId:"vimukthi-perera-notification-service"})
    private readonly admin = this.kafka.admin()
    async onModuleInit() {
       await this.consumer.connect()
       await this.subscribeToOrderConfirmed()
    }
    orderConfirmedNotification(){
        console.log("++++++++++++++++++Order successfully created+++++++++++++")
    }
    async subscribeToOrderConfirmed(){
        console.log("consumer:::vimukthi.perera.order.confirmed")
        await this.consumer.subscribe({topic:"vimukthi.perera.order.confirmed",fromBeginning:true})
        const topics = await this.admin.listTopics();
        console.log("topics.........",topics)
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log("consumer eachMessage:::vimukthi.perera.order.confirmed")
                console.log("notification: ", message.value?.toString());
                this.orderConfirmedNotification()
            }
        })
    }

}
