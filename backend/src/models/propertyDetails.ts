import { InferSchemaType, Schema, model } from "mongoose";


const propertyDetailsSchemaMain = new Schema({
    ownerDetailsId: {type: Schema.Types.ObjectId, required: true},
    rentReceiptDetailsId: {type: Schema.Types.ObjectId, required: true},
    
    propertyName: {type:String, required:true},
    propertyAddress: {type:String, required:true},
    propertyTakeRentOf: {type:String, required:true},//Two values{1. Previous Month{Post-Paid Mode}, 2. Current Month{Pre-Paid Mode}}
    
},{ timestamps: true });



type IPropertyDetailsMainModel = InferSchemaType<typeof propertyDetailsSchemaMain>;

export default model<IPropertyDetailsMainModel>("PropertyDetails", propertyDetailsSchemaMain);