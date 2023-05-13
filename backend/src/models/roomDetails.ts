import { InferSchemaType, Schema, model } from "mongoose";


const roomDetailsSchemaMain = new Schema({
    propertyId: {type: Schema.Types.ObjectId, required: true},

    roomDetails_room_name: {type:String, required:true},
    roomDetails_room_rent: {type:Number, required:true},
    roomDetails_color_separator: {type:String, required:true},
    roomDetails_room_type: {type:String, required:true},
    roomDetails_room_remarks: {type:String, required:true},

    rent_calc_method: {type:String, required:true},

    elect_details_elect_type: {type:String, required:true},//1. No Cost{By Default}, 2. Fixed Cost, 3. Meter Reading 
    elect_details_elect_mtr_nm: {type:String, required:false},
    elect_details_elect_mtr_reading: {type:String, required:false},
    elect_details_elect_mtr_per_unit_cost: {type:String, required:false},

    elect_details_elect_fixed_amt: {type:Number, required:false},

    water_details_water_type: {type:String, required:true},//1. No Cost{By Default}, 2. Fixed Cost, 3. Meter Reading
    water_details_water_mtr_nm: {type:String, required:false},
    water_details_water_mtr_reading: {type:String, required:false},
    water_details_water_mtr_per_unit_cost: {type:String, required:false},

    water_details_water_fixed_amt: {type:Number, required:false},

},{ timestamps: true });



type IRoomDetailsModel = InferSchemaType<typeof roomDetailsSchemaMain>;

export default model<IRoomDetailsModel>("RoomDetails", roomDetailsSchemaMain);