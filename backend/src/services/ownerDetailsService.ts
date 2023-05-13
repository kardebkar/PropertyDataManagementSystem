import  { RequestHandler } from "express";
import createHttpError from "http-errors";
import { assertIsDefined } from "../util/assertIsDefined";
import mongoose from "mongoose";

import IOwnerDetailsMainModel from "../models/ownerDetails";

export const getAllOwnerDetails:RequestHandler = async(req,res,next)=>{
    const authenticatedUserId=req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        const allOwnersDetails = await IOwnerDetailsMainModel.find().exec();
    
        res.status(200).json(allOwnersDetails);
    } catch (error) {
        next(error);
    }
}
