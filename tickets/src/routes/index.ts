import express, { Request, Response } from 'express';
import { NotFoundError } from '@anujkmr/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/', async (req:Request, res:Response)=>{
 
    const tickets =await Ticket.find({ orderId:undefined });
   
    res.status(200).send(tickets);
 
});

export { router as indexTicketRouter };