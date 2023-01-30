import { Publisher, OrderCancelledEvent, Subjects } from "@anujkmr/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled= Subjects.OrderCancelled;
}