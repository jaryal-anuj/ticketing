import { Publisher, Subjects,TicketUpdatedEvent } from '@anujkmr/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}