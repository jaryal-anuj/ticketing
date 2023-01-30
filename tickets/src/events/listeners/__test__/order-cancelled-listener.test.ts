import { OrderCancelledEvent, OrderStatus } from "@anujkmr/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";




const setup =async()=>{
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket  = Ticket.build({
        title:'concert',
        price:99,
        userId:'sdfsd',
    });

    ticket.set({orderId});
    await ticket.save();
    const data:OrderCancelledEvent['data'] = {
        id: orderId,
        version:0,
        ticket:{
            id:ticket.id,
        }
    };

    //@ts-ignore
    const msg:Message={
        ack:jest.fn()
    };
    return { listener,data, msg, ticket, orderId };
}

it('updated the ticket', async()=>{
    const { listener, data, msg, ticket }= await setup();
    await listener.onMessage(data,msg);
    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();
});

it('acks the message', async()=>{
    const { listener, data, msg }= await setup();
    await listener.onMessage(data,msg);
    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket cancelled event', async()=>{
    const { listener, data, msg, ticket }= await setup();
    await listener.onMessage(data,msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();

});