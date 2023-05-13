import {RequestHandler} from 'express';
import * as OwnerDetailsService  from '../services/ownerDetailsService';


export const getAllOwnerDetails:RequestHandler = async(req,res,next)=>{
    await OwnerDetailsService.getAllOwnerDetails(req,res,next);
}