import { InferSchemaType, Schema, model } from "mongoose";


const userSchema = new Schema({
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
    
    is_active:{type:Boolean, required:true},
    is_verified:{type:Boolean, required:true},
    is_deleted:{type:Boolean, required:true},
    created_at:{type:Date},
    updated_at:{type:Date},
    deleted_at:{type:Date},
    communication_preferences:{type:String, required:true},
},{ timestamps: true });


type User = InferSchemaType<typeof userSchema>;


export default model<User>("User", userSchema);