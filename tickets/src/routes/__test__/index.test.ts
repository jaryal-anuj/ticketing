import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTicket = ()=>{
    return  request(app)
    .post('/')
    .set('Cookie', global.signin())
    .send({
        title:"dsfsdf",
        price:10
    });
}

it('can fetch a list of tickets', async()=>{

    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get(`/`)
        .send()
        .expect(200)
    
    expect(response.body.length).toEqual(3);
   

});