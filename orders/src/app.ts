import express,{Request, Response} from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError,currentUser } from '@anujkmr/common';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';



const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    secure:false
}));

app.use(currentUser)
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);


app.all('*', async( req:Request, res:Response )=>{

    throw new NotFoundError();
});

app.use(errorHandler);

export { app };