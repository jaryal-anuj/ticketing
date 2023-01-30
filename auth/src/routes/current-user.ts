import express, { Request, Response } from 'express';
import { currentUser } from '@anujkmr/common';

const router = express.Router();

router.get('/currentuser', currentUser, (req, res)=>{

    res.send({ currentUser:req.currentUser|| null });
 
});

export { router as currentUserRouter };
