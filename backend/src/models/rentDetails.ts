import { InferSchemaType, Schema, model } from "mongoose";

const rentDetailsSchemaMain = new Schema({
    tenantDetailsId: {type: Schema.Types.ObjectId, required: true},
    roomDetailsId: {type: Schema.Types.ObjectId, required: true},
    outstandingRent: {type:Number, required:true},
    rentPaid: {type:Number, required:true},
    rentPaidDate: {type:Date, required:true},
    rentDueDate: {type:Date, required:true},
    rentRemarks: {type:String, required:true},
});

type IRentDetailsModel = InferSchemaType<typeof rentDetailsSchemaMain>;

export default model<IRentDetailsModel>("RentDetails", rentDetailsSchemaMain);