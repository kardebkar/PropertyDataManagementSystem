import {RequestHandler} from 'express';
import * as UserService  from '../services/userService';
import { IUserCreateModel, IUserLoginBodyModel, IUserUpdateParamsModel, IUserUpdateBodyModel } from "../models/user";


export const getAllUsers:RequestHandler = async(req,res,next)=>{
    await UserService.getAllUsers(req,res,next);
}

export const getAuthenticatedUser: RequestHandler = async(req, res, next)=>{
    await UserService.getAuthenticatedUser(req,res,next);
}

export const createUser: RequestHandler<unknown, unknown, IUserCreateModel, unknown> = async(req, res, next)=>{
    await UserService.createUser(req,res,next);
}

export const updateUser: RequestHandler<IUserUpdateParamsModel, unknown, IUserUpdateBodyModel, unknown> = async(req, res, next)=>{
    await UserService.updateUser(req,res,next);
}

export const deleteUser: RequestHandler = async(req, res, next)=>{
    await UserService.deleteUser(req,res,next);
}

export const login: RequestHandler<unknown, unknown, IUserLoginBodyModel, unknown> = async(req, res, next)=>{
    await UserService.login(req,res,next);
}

export const logout: RequestHandler = async(req, res, next)=>{
    await UserService.logout(req,res,next);
}







// export const verifyEmail: RequestHandler<unknown, unknown, UserService.IUserVerifyEmailBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.verifyEmail(req,res,next);
// }

// export const forgotPassword: RequestHandler<unknown, unknown, UserService.IUserForgotPasswordBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.forgotPassword(req,res,next);
// }

// export const resetPassword: RequestHandler<unknown, unknown, UserService.IUserResetPasswordBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.resetPassword(req,res,next);
// }

// export const changePassword: RequestHandler<unknown, unknown, UserService.IUserChangePasswordBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.changePassword(req,res,next);
// }

// export const changeEmail: RequestHandler<unknown, unknown, UserService.IUserChangeEmailBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.changeEmail(req,res,next);
// }

// export const changeUsername: RequestHandler<unknown, unknown, UserService.IUserChangeUsernameBodyModel, unknown> = async(req, res, next)=>{
//     await UserService.changeUsername(req,res,next);
// }


