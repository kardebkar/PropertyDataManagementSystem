import { InferSchemaType, Schema, model } from "mongoose";


const userSchemaMain = new Schema({
    username:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true, select:false},
    password:{type:String, required:true, select:false},
    role:{type:String, required:true},

    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    phone_number:{type:String, required:true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    zip_code:{type:String, required:true},
    country:{type:String, required:true},
    communication_preferences:{type:String, required:true},

    is_active:{type:Boolean, required:true},
    is_verified:{type:Boolean, required:true},
    is_deleted:{type:Boolean, required:true},

    deletedAt:{type:Date, required:false},
    
},{ timestamps: true });



type IUserMainModel = InferSchemaType<typeof userSchemaMain>;

export default model<IUserMainModel>("Users", userSchemaMain);

export interface IUserCreateModel {
    username:string;
    email:string;
    password:string;
    role:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    address:string;
    city:string;
    state:string;
    zip_code:string;
    country:string;
    communication_preferences:string;
    is_active:boolean;
    is_verified:boolean;
    is_deleted:boolean;
    deletedAt:Date;
}

export interface IUserViewModel {
    username:string;
    email:string;
    password:string;
    role:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    address:string;
    city:string;
    state:string;
    zip_code:string;
    country:string;
    communication_preferences:string;
    is_active:boolean;
    is_verified:boolean;
    is_deleted:boolean;
    deletedAt:Date;
}

export interface IUserLoginBodyModel{
    username?: string,
    password?: string,
}

export interface IUserUpdateParamsModel{
    userId: string,
}

export interface IUserUpdateBodyModel{
    username:string;
    email:string;
    password:string;
    role:string;
    first_name:string;
    last_name:string;
    phone_number:string;
    address:string;
    city:string;
    state:string;
    zip_code:string;
    country:string;
    communication_preferences:string;
    is_active:boolean;
    is_verified:boolean;
    is_deleted:boolean;
    deletedAt:Date;
}
