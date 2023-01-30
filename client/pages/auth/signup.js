import { useRouter } from 'next/router';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

export default function SignUp (){

    const router = useRouter()
    const[ email, setEmail] = useState('');
    const[ password, setPassword] = useState('');
    const{doRequest, errors} = useRequest({
        url:"/api/users/signup",
        method:"post",
        body:{
            email,password
        },
        onSuccess:()=> router.push('/')
    });

    const onSubmit = async (event)=>{
        event.preventDefault();
        doRequest();

    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <form style={{width:'40%'}} onSubmit={onSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" />
                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            className="form-control" 
                            id="exampleInputPassword1" />
                    </div>
                    {errors}
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        </>
    );
}