import useRequest from '../../hooks/use-request';
import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router'

const OrderShow = ({ order, currentUser })=>{
    const [ timeLeft, setTimeLeft] = useState('');


    const{doRequest, errors} = useRequest({
        url:"/api/payments",
        method:"post",
        body:{
            orderId:order.id
        },
        onSuccess:(payment)=> Router.push('/orders')
    });

    useEffect(()=>{
        const findTimeLeft = ()=>{
            const msLeft = new Date(order.expiresAt)- new Date();
            setTimeLeft(Math.round(msLeft/1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft,1000);
        return ()=>{
            clearInterval(timerId);
        }
    },[order]);

    if(timeLeft<=0){
        return <div>Order Expired</div>
    }
    
    return (
        <div className="pt-5">
            <h1>{ order.ticket.title }</h1>
            <div>{ timeLeft } seconds until order expires</div>
            
            <StripeCheckout 
            token={ ({id})=>doRequest({token:id}) }
            amount={ order.ticket.price*100 }
            email= { currentUser.email }
            stripeKey="pk_test_51MUlydCEnlba39tQs2Ggfog9TGlyGjpbd4Lmk8HfqzAouesWLbOSU9CPVde9w4dKfzkYf7FuHAYBG9XWuzDWV8yG00y3cV1F4e" />
            {errors}
        </div>
    )
}

OrderShow.getInitialProps = async(context, client)=>{
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order:data };
};

export default OrderShow;