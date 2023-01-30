import { Publisher, Subjects, PaymentCreatedEvent } from "@anujkmr/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated= Subjects.PaymentCreated;
}