import { useState } from "react";
import useRequest from '../../hooks/use-request';
import Router from "next/router";

const NewTicket = ()=>{
  
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const{doRequest, errors} = useRequest({
        url:"/api/tickets",
        method:"post",
        body:{
            title,price
        },
        onSuccess:(ticket)=> Router.push('/')
    });

    const onBlur = ()=>{
        const value = parseFloat(price);
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        doRequest();

    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div style={{width:'40%'}}>
                    <h1>Create a Ticket</h1>
                    <form  onSubmit={onSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                className="form-control" 
                                id="title" 
                                aria-describedby="emailHelp" />
                        
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input 
                                type="text"
                                value={price}
                                onBlur={onBlur}
                                onChange={e=>setPrice(e.target.value)}
                                className="form-control" 
                                id="price" />
                        </div>
                        {errors}
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewTicket;