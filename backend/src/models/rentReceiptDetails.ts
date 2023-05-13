import { InferSchemaType, Schema, model } from "mongoose";


const rentReceiptDetailsSchemaMain = new Schema({
    logo: {type:String, required:true},
    bk_details_bk_name: {type:String, required:true},
    bk_details_bk_acc_number: {type:String, required:true},
    bk_details_bk_ifsc: {type:String, required:true},
    bk_details_acc_holder_name: {type:String, required:true},

    wallet_details_type: {type:String, required:true},
    wallet_details_phone_number: {type:String, required:true},
    wallet_details_name: {type:String, required:true},
    wallet_details_upi_id: {type:String, required:true},
    will_generate_direct_upi_payment_links: {type:Boolean, required:true},

    payment_qr_code: {type:String, required:true},
    payment_signature: {type:String, required:true},
    payment_watermark: {type:String, required:true},

},{ timestamps: true });



type IRentReceiptDetalsModel = InferSchemaType<typeof rentReceiptDetailsSchemaMain>;

export default model<IRentReceiptDetalsModel>("RentReceiptDetails", rentReceiptDetailsSchemaMain);