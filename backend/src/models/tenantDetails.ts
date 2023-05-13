import { InferSchemaType, Schema, model } from "mongoose";

const tenantDetailsSchemaMain = new Schema({
    roomDetailsId: {type: Schema.Types.ObjectId, required: true},

    imp_det_salutation: {type:String, required:true},
    imp_det_tenat_name: {type:String, required:true},
    imp_det_profession: {type:String, required:true},
    imp_det_no_of_people: {type:String, required:true},

    contact_info_address_native: {type:String, required:true},
    contact_info_address_work: {type:String, required:true},
    contact_info_primary_phone: {type:String, required:true},//This Will be used for All Communication
    contact_info_secondary_phone: {type:String, required:true},
    contact_info_email: {type:String, required:true},

    amount_details_deposit_amt: {type:Number, required:true},
    amount_details_deposit_paid_dt: {type:Date, required:true},


    imp_dt_move_in_dt: {type:Date, required:true},
    imp_dt_start_rent_from_dt: {type:Date, required:true},

    lease_type: {type:String, required:true},//1.Until Tenant Leaves, 2. Fixed and Defined Period

    lease_start_dt: {type:Date, required:true},
    lease_period_num: {type:Number, required:true},
    lease_period_type: {type:String, required:true},//1. Days, 2. Months, 3. Years

    add_info_emgcy_contact_num: {type:String, required:true},
    add_info_emgcy_contact_name: {type:String, required:true},

    tenant_remarks: {type:String, required:true},

    extra_service: {type:String, required:true},//1. Bike Parking, 2. Car Parking, 3. None

},{ timestamps: true });

type ITenantDetailsModel = InferSchemaType<typeof tenantDetailsSchemaMain>;

export default model<ITenantDetailsModel>("TenantDetails", tenantDetailsSchemaMain);