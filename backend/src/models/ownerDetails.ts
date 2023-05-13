import { InferSchemaType, Schema, model } from "mongoose";


const ownerDetailsSchemaMain = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    ownerName: {type:String, required:true},
    ownerMobileNo: {type:String, required:true},
    ownerEmail: {type:String, required:true},
    ownerWebsite: {type:String, required:true},
    
},{ timestamps: true });



type IOwnerDetailsMainModel = InferSchemaType<typeof ownerDetailsSchemaMain>;

export default model<IOwnerDetailsMainModel>("OwnerDetails", ownerDetailsSchemaMain);



export interface IOwnerDetailsCreateModel {
    userId: Schema.Types.ObjectId;
    ownerName:string;
    ownerMobileNo:string;
    ownerEmail:string;
    ownerWebsite:string;
}


export interface IOwnerDetailsUpdateParamsModel{
    ownerId:string;
}

export interface IOwnerDetailsUpdateBodyModel{
    userId: Schema.Types.ObjectId;
    ownerName:string;
    ownerMobileNo:string;
    ownerEmail:string;
    ownerWebsite:string;
}