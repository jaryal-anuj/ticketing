import { Publisher, OrderCreatedEvent, Subjects } from "@anujkmr/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated= Subjects.OrderCreated;
}