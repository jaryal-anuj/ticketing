import { Publisher, ExpirationCompleteEvent, Subjects } from "@anujkmr/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete= Subjects.ExpirationComplete;
}