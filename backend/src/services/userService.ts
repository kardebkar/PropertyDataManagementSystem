import  { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { assertIsDefined } from "../util/assertIsDefined";
import mongoose from "mongoose";

import IUserMainModel, { IUserCreateModel, IUserLoginBodyModel, IUserUpdateParamsModel, IUserUpdateBodyModel } from "../models/user";


export const getAllUsers:RequestHandler = async(req,res,next)=>{
    const authenticatedUserId=req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        const users = await IUserMainModel.find().exec();
    
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getAuthenticatedUser: RequestHandler = async(req, res, next)=>{

    try {
        const user = await IUserMainModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser: RequestHandler<unknown, unknown, IUserCreateModel, unknown> = async(req, res, next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const role = req.body.role;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip_code = req.body.zip_code;
    const country = req.body.country;
    const is_active = req.body.is_active;
    const is_verified = req.body.is_verified;
    const is_deleted = req.body.is_deleted;
    const communication_preferences = req.body.communication_preferences;


    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters Missing!");
        }

        const existingUserName = await IUserMainModel.findOne({username: username}).exec();

        if(existingUserName){
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail= await IUserMainModel.findOne({email:email}).exec();

        if(existingEmail){
            throw createHttpError(409, "A User with this email address already exists. Please login instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await IUserMainModel.create({
            username: username,
            email: email,
            password: passwordHashed,

            role: role,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            address: address,
            city: city,
            state: state,
            zip_code: zip_code,
            country: country,
            is_active: true,
            is_verified: false,
            is_deleted: false,
            communication_preferences: communication_preferences,

        });

        req.session.userId=newUser._id;

        res.status(201).json(newUser); 

    } catch (error) {
        next(error);
    }

};

export const updateUser:RequestHandler<IUserUpdateParamsModel, unknown, IUserUpdateBodyModel, unknown> = async(req,res,next)=>{
    const paramUserId=req.params.userId;

    const newUsername = req.body.username;
    const newEmail = req.body.email;
    const newPasswordRaw = req.body.password;
    const newRole = req.body.role;
    const newFirst_name = req.body.first_name;
    const newLast_name = req.body.last_name;
    const newPhone_number = req.body.phone_number;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const newState = req.body.state;
    const newZip_code = req.body.zip_code;
    const newCountry = req.body.country;
    const new_is_active = req.body.is_active;
    const new_is_verified = req.body.is_verified;
    const new_is_deleted = req.body.is_deleted;
    const new_communication_preferences = req.body.communication_preferences;

    const authenticatedUserId=req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(paramUserId)){
            throw createHttpError(400,"Invalid User ID!");
        }
        if(!newUsername){
            throw createHttpError(400,"User must have an username!");
        }

        const user = await IUserMainModel.findById(paramUserId).exec();

        if(!user){
            throw createHttpError(404,"User not Found!");
        }

        if(!user._id.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot update other than signed In User.");
        }

        user.username = newUsername;
        user.email = newEmail;
        if(newPasswordRaw){
            user.password = await bcrypt.hash(newPasswordRaw, 10);
        }
        else{
            // eslint-disable-next-line no-self-assign
            user.password = user.password;
        }
        user.role =  newRole;
        user.first_name = newFirst_name;
        user.last_name = newLast_name;
        user.phone_number = newPhone_number;
        user.address = newAddress;
        user.city = newCity;
        user.state = newState;
        user.zip_code = newZip_code;
        user.country = newCountry;
        user.is_active = new_is_active;
        user.is_verified = new_is_verified;
        user.is_deleted = new_is_deleted;
        user.communication_preferences = new_communication_preferences;

        const updatedUser=await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async(req,res,next)=>{
    const userId=req.params.userId;
    const authenticatedUserId=req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(userId)){
            throw createHttpError(400,"Invalid User id.");
        }
        const userToDelete = await IUserMainModel.findById(userId).exec();

        if(!userToDelete){
            throw createHttpError(404,"User Not Found!");
        }
        if(userToDelete.id===(authenticatedUserId)){
            throw createHttpError(406,"You cannot delete yourself while you are logged in!");
        }


        await userToDelete.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler<unknown, unknown, IUserLoginBodyModel, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(!username || !password){
            throw createHttpError(400, "Parameters missing.");
        }

        const user = await IUserMainModel.findOne({username: username}).select("+password +email").exec();
        if(!user){
            throw createHttpError(401, "Invalid credentials.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw createHttpError(401, "Invalid Credentials!");
        }

        req.session.userId=user._id;
        res.status(201).json(user);
    }
    catch(error){
        next(error);
    }
};


export const logout: RequestHandler = (req, res, next)=>{
    req.session.destroy(error=>{
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
};