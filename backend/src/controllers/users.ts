import  { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";



export const getAuthenticatedUser: RequestHandler = async(req, res, next)=>{

    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);


    } catch (error) {
        next(error);
    }
};


interface SignUpBody{
    username?: string,
    email?: string,
    password?: string,
    role?: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string,
    address?: string,
    city?: string,
    state?: string,
    zip_code?: string,
    country?: string,
    is_active?: boolean,
    is_verified?: boolean,
    is_deleted?: boolean,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    communication_preferences?: string,

}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async(req, res, next)=>{
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
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;
    const deleted_at = req.body.deleted_at;
    const communication_preferences = req.body.communication_preferences;


    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters Missing!");
        }

        const existingUserName = await UserModel.findOne({username: username}).exec();

        if(existingUserName){
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail= await UserModel.findOne({email:email}).exec();

        if(existingEmail){
            throw createHttpError(409, "A User with this email address already exists. Please login instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
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

interface LoginBody{
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(!username || !password){
            throw createHttpError(400, "Parameters missing.");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();
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