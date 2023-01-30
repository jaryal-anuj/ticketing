import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global{

    var signin:(id?:string)=> string[];
 
}

jest.mock('../nats-wrapper');
//jest.mock('../stripe');
let mongo: any;
process.env.STRIPE_KEY='sk_test_51MUlydCEnlba39tQ1fPxEsKhXCFXYk1neJh3ZKYeoaolCpHKa2n2J2zMBsw3gXq67qClhfUeCMBsFZ4SYDRnf0un00EIifQ9ON';
beforeAll(async ()=>{
    process.env.JWT_KEY = "asdf";
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    mongo = await  MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri,{});

});


beforeEach(async ()=>{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async ()=>{
    if(mongo){
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin =  (id?:string)=>{

   const payload = {
        id:id || new mongoose.Types.ObjectId().toHexString(),
        email:"test@test.com"
   }

   const token = jwt.sign(payload, process.env.JWT_KEY!);
   const session = {jwt:token};
   const sessionJSON= JSON.stringify(session);
   const base64 = Buffer.from(sessionJSON).toString('base64');
   return [`session=${base64}`]
}