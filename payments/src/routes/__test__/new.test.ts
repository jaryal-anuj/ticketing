import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@anujkmr/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';


it('returns a 404 when purchasing an order  that does not exist', async()=>{
    const orderId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .post('/')
        .set('Cookie',global.signin())
        .send({ token:'sdfsd',orderId })
        .expect(404);

});

it('returns a 401 when purchasing an order that does not belong to user', async()=>{
    const order = Order.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        userId:new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        version:0,
        price:99
    });
    await order.save();
    await request(app)
        .post('/')
        .set('Cookie',global.signin())
        .send({ token:'sdfsd',orderId:order.id })
        .expect(401);

});

it('returns a 400 when purchasing a cancelled order', async()=>{
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        userId:userId,
        status: OrderStatus.Cancelled,
        version:0,
        price:99
    });
    await order.save();
    await request(app)
        .post('/')
        .set('Cookie',global.signin(userId))
        .send({ token:'sdfsd',orderId:order.id })
        .expect(400);

});

it('returns a 201 with valid inputs', async ()=>{
    const userId = new mongoose.Types.ObjectId().toHexString();
    let price = Math.floor(Math.random()* 100000);
    const order = Order.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        userId:userId,
        status: OrderStatus.Created,
        version:0,
        price
    });
    await order.save();
    await request(app)
        .post('/')
        .set('Cookie',global.signin(userId))
        .send({ token:'tok_visa',orderId:order.id })
        .expect(201);

    // const chargOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    // expect(chargOptions.source).toEqual('tok_visa');
    // expect(chargOptions.amount).toEqual(99*100);
    // expect(chargOptions.currency).toEqual('usd');
    let stripeCharges = await stripe.charges.list({ limit:50 });
    const stripeCharge = stripeCharges.data.find(charge=>{
        return charge.amount === price * 100
    });

    expect(stripeCharge).toBeDefined();
    expect(stripeCharge!.currency).toEqual('usd');

    const payment = await Payment.findOne({
        orderId:order.id,
        stripeId: stripeCharge!.id 
    });
    expect(payment).not.toBeNull();

});

