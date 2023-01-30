import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';


it('returns a 404 if the provide id does not exist', async()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
    .put(`/${id}`)
    .set('Cookie', global.signin())
    .send({title:"sdfsdf", price:10})
    .expect(404);
    
   

});

it('returns a 401 if the user is not authenticated', async()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
    .put(`/${id}`)
    .send({title:"sdfsdf", price:10})
    .expect(401);
});

it('return  a 401 if the user does not own the ticket', async()=>{
 
    let title = "This is test";
    let price  = 20;
    let response = await request(app)
    .post('/')
    .set('Cookie', global.signin())
    .send({
        title,
        price
    });

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
        title,
        price
    })
    .expect(401);
   
});

it('return  a 400 if the user provides an invalid title or price', async()=>{
    let title = "This is test";
    let price  = 20;
    let cookie =global.signin();
    let response = await request(app)
    .post('/')
    .set('Cookie',cookie )
    .send({
        title,
        price
    });

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title:'',
        price:20
    })
    .expect(400);

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title:'sdfsdf',
        price:-20
    })
    .expect(400);

});

it('updates the ticket provide valid inputs', async()=>{
    let title = "This is test";
    let price  = 20;
    let cookie =global.signin();
    let response = await request(app)
    .post('/')
    .set('Cookie',cookie )
    .send({
        title:'new title',
        price:100
    });

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title,
        price
    })
    .expect(200);

    const ticketResponse = await request(app)
    .get(`/${response.body.id}`)
    .send()
    .expect(200)
    
    expect(ticketResponse.body.price).toEqual(price);
    expect(ticketResponse.body.title).toEqual(title);
});


it('publishes an event', async()=>{
    let title = "This is test";
    let price  = 20;
    let cookie =global.signin();
    let response = await request(app)
    .post('/')
    .set('Cookie',cookie )
    .send({
        title,
        price
    });

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title:'',
        price:20
    })
    .expect(400);

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title:'sdfsdf',
        price:-20
    })
    .expect(400);

});

it('updates the ticket provide valid inputs', async()=>{
    let title = "This is test";
    let price  = 20;
    let cookie =global.signin();
    let response = await request(app)
    .post('/')
    .set('Cookie',cookie )
    .send({
        title:'new title',
        price:100
    });

    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title,
        price
    })
    .expect(200);

    const ticketResponse = await request(app)
    .get(`/${response.body.id}`)
    .send()
    .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async()=>{
    let title = "This is test";
    let price  = 20;
    let cookie =global.signin();
    let response = await request(app)
    .post('/')
    .set('Cookie',cookie )
    .send({
        title:'new title',
        price:100
    });
    const ticket = await Ticket.findById(response.body.id);
    ticket!.set({orderId:new mongoose.Types.ObjectId().toHexString()});
    await ticket!.save();
    await request(app)
    .put(`/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title,
        price
    })
    .expect(400);
});

