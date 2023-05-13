import {RequestHandler} from 'express';
import * as OwnerDetailsService  from '../services/ownerDetailsService';
import { IOwnerDetailsCreateModel, IOwnerDetailsUpdateBodyModel, IOwnerDetailsUpdateParamsModel } from '../models/ownerDetails';


export const getAllOwnerDetails:RequestHandler = async(req,res,next)=>{
    await OwnerDetailsService.getAllOwnerDetails(req,res,next);
}

export const getOneOwnerDetails:RequestHandler = async(req,res,next)=>{
    await OwnerDetailsService.getOneOwnerDetails(req,res,next);
}

export const createOwnerDetails: RequestHandler<unknown, unknown, IOwnerDetailsCreateModel, unknown> = async(req, res, next)=>{
    await OwnerDetailsService.createOwnerDetails(req,res,next);
}


export const updateOwnerDetails: RequestHandler<IOwnerDetailsUpdateParamsModel, unknown, IOwnerDetailsUpdateBodyModel, unknown> = async(req, res, next)=>{
    await OwnerDetailsService.updateOwnerDetails(req,res,next);
}

export const deleteOwnerDetails:RequestHandler = async(req,res,next)=>{
    await OwnerDetailsService.deleteOwnerDetails(req,res,next);
}

