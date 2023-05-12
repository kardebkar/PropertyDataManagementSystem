import  { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { assertIsDefined } from "../util/assertIsDefined";
import mongoose from "mongoose";



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




export const getUsers:RequestHandler = async (req, res, next)=>{
    const authenticatedUserId=req.session.userId;
    
    
    try {
        
        assertIsDefined(authenticatedUserId);

        // //sample data insertion

        // // const userData = [
        //     // { username: 'johnDoe', email: 'johnDoe@example.com', password: 'johndoe123', role: 'user', first_name: 'John', last_name: 'Doe', phone_number: '1234567890', address: '123 Main St', city: 'Los Angeles', state: 'California', zip_code: '90001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'janeDoe', email: 'janeDoe@example.com', password: 'janedoe123', role: 'user', first_name: 'Jane', last_name: 'Doe', phone_number: '0987654321', address: '456 Oak St', city: 'San Francisco', state: 'California', zip_code: '94101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jimSmith', email: 'jimSmith@example.com', password: 'jimsmith123', role: 'user', first_name: 'Jim', last_name: 'Smith', phone_number: '1230984567', address: '789 Pine St', city: 'San Diego', state: 'California', zip_code: '92101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'samBrown', email: 'samBrown@example.com', password: 'sambrown123', role: 'user', first_name: 'Sam', last_name: 'Brown', phone_number: '9876543210', address: '101 Maple St', city: 'Chicago', state: 'Illinois', zip_code: '60007', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'mikeJohnson', email: 'mikeJohnson@example.com', password: 'mikejohnson123', role: 'user', first_name: 'Mike', last_name: 'Johnson', phone_number: '8765432109', address: '202 Pine St', city: 'Houston', state: 'Texas', zip_code: '77002', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jessicaWilliams', email: 'jessicaWilliams@example.com', password: 'jessicawilliams123', role: 'user', first_name: 'Jessica', last_name: 'Williams', phone_number: '7654321098', address: '303 Birch St', city: 'Phoenix', state: 'Arizona', zip_code: '85001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'tomMiller', email: 'tomMiller@example.com', password: 'tommiller123', role: 'user', first_name: 'Tom', last_name: 'Miller', phone_number: '6543210987', address: '404 Cedar St', city: 'Philadelphia', state: 'Pennsylvania', zip_code: '19019', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'lindaDavis', email: 'lindaDavis@example.com', password: 'lindadavis123', role: 'user', first_name: 'Linda', last_name: 'Davis', phone_number: '5432109876', address: '505 Oak St', city: 'San Antonio', state: 'Texas', zip_code: '78201', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jamesWilson', email: 'jamesWilson@example.com', password: 'jameswilson123', role: 'user', first_name: 'James', last_name: 'Wilson', phone_number: '4321098765', address: '606 Walnut St', city: 'San Diego', state: 'California', zip_code: '92101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'patriciaMoore', email: 'patriciaMoore@example.com', password: 'patriciamoore123', role: 'user', first_name: 'Patricia', last_name: 'Moore', phone_number: '3210987654', address: '707 Elm St', city: 'Dallas', state: 'Texas', zip_code: '75001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
          
        //     // { username: 'markJohnson', email: 'markJohnson@example.com', password: 'markjohnson123', role: 'user', first_name: 'Mark', last_name: 'Johnson', phone_number: '1987654321', address: '1012 Elm St', city: 'Chicago', state: 'Illinois', zip_code: '60007', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'lisaJackson', email: 'lisaJackson@example.com', password: 'lisajackson123', role: 'user', first_name: 'Lisa', last_name: 'Jackson', phone_number: '1876543210', address: '1023 Willow St', city: 'Indianapolis', state: 'Indiana', zip_code: '46201', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'michaelWhite', email: 'michaelWhite@example.com', password: 'michaelwhite123', role: 'user', first_name: 'Michael', last_name: 'White', phone_number: '1765432109', address: '1045 Cedar St', city: 'Columbus', state: 'Ohio', zip_code: '43085', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'sarahHarris', email: 'sarahHarris@example.com', password: 'sarahharris123', role: 'user', first_name: 'Sarah', last_name: 'Harris', phone_number: '1654321098', address: '1067 Oak St', city: 'Charlotte', state: 'North Carolina', zip_code: '28202', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jamesMartin', email: 'jamesMartin@example.com', password: 'jamesmartin123', role: 'user', first_name: 'James', last_name: 'Martin', phone_number: '1543210987', address: '1089 Pine St', city: 'Seattle', state: 'Washington', zip_code: '98101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jessicaThompson', email: 'jessicaThompson@example.com', password: 'jessicathompson123', role: 'user', first_name: 'Jessica', last_name: 'Thompson', phone_number: '1432109876', address: '1100 Birch St', city: 'Denver', state: 'Colorado', zip_code: '80014', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'chrisGarcia', email: 'chrisGarcia@example.com', password: 'chrisgarcia123', role: 'user', first_name: 'Chris', last_name: 'Garcia', phone_number: '1321098765', address: '1111 Maple St', city: 'Washington', state: 'DC', zip_code: '20001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'ashleyClark', email: 'ashleyClark@example.com', password: 'ashleyclark123', role: 'user', first_name: 'Ashley', last_name: 'Clark', phone_number: '1210987654', address: '1122 Cherry St', city: 'Boston', state: 'Massachusetts', zip_code: '02101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'brianRodriguez', email: 'brianRodriguez@example.com', password: 'brianrodriguez123', role: 'user', first_name: 'Brian', last_name: 'Rodriguez', phone_number: '1098765432', address: '1133 Walnut St', city: 'Nashville', state: 'Tennessee', zip_code: '37201', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'maryLewis', email: 'maryLewis@example.com', password: 'marylewis123', role: 'user', first_name: 'Mary', last_name: 'Lewis', phone_number: '1987654321', address: '1144 Spruce St', city: 'Austin', state: 'Texas', zip_code: '73301', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'sarahWilson', email: 'sarahWilson@example.com', password: 'sarahwilson123', role: 'user', first_name: 'Sarah', last_name: 'Wilson', phone_number: '5555555555', address: '321 Pine Rd', city: 'San Francisco', state: 'California', zip_code: '94101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'michaelAnderson', email: 'michaelAnderson@example.com', password: 'michaelanderson123', role: 'user', first_name: 'Michael', last_name: 'Anderson', phone_number: '1111111111', address: '999 Cedar Ln', city: 'Seattle', state: 'Washington', zip_code: '98101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'emilyThomas', email: 'emilyThomas@example.com', password: 'emilythomas123', role: 'user', first_name: 'Emily', last_name: 'Thomas', phone_number: '9999999999', address: '888 Walnut Blvd', city: 'Austin', state: 'Texas', zip_code: '73301', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'davidMartinez', email: 'davidMartinez@example.com', password: 'davidmartinez123', role: 'user', first_name: 'David', last_name: 'Martinez', phone_number: '7777777777', address: '555 Birch Dr', city: 'Denver', state: 'Colorado', zip_code: '80201', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'oliviaJohnson', email: 'oliviaJohnson@example.com', password: 'oliviajohnson123', role: 'user', first_name: 'Olivia', last_name: 'Johnson', phone_number: '3333333333', address: '222 Elm St', city: 'Chicago', state: 'Illinois', zip_code: '60007', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'jamesDavis', email: 'jamesDavis@example.com', password: 'jamesdavis123', role: 'user', first_name: 'James', last_name: 'Davis', phone_number: '4444444444', address: '333 Oak St', city: 'New York', state: 'New York', zip_code: '10001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'sophiaMoore', email: 'sophiaMoore@example.com', password: 'sophiamoore123', role: 'user', first_name: 'Sophia', last_name: 'Moore', phone_number: '2222222222', address: '111 Maple Ave', city: 'Los Angeles', state: 'California', zip_code: '90001', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'williamTaylor', email: 'williamTaylor@example.com', password: 'williamtaylor123', role: 'user', first_name: 'William', last_name: 'Taylor', phone_number: '6666666666', address: '444 Pine Rd', city: 'San Francisco', state: 'California', zip_code: '94101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'avaAnderson', email: 'avaAnderson@example.com', password: 'avaanderson123', role: 'user', first_name: 'Ava', last_name: 'Anderson', phone_number: '8888888888', address: '666 Cedar Ln', city: 'Seattle', state: 'Washington', zip_code: '98101', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'loganThomas', email: 'loganThomas@example.com', password: 'loganthomas123', role: 'user', first_name: 'Logan', last_name: 'Thomas', phone_number: '1212121212', address: '232 Walnut Blvd', city: 'Austin', state: 'Texas', zip_code: '73301', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'miaMartinez', email: 'miaMartinez@example.com', password: 'miamartinez123', role: 'user', first_name: 'Mia', last_name: 'Martinez', phone_number: '4545454545', address: '676 Birch Dr', city: 'Denver', state: 'Colorado', zip_code: '80201', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        //     // { username: 'noahJohnson', email: 'noahJohnson@example.com', password: 'noahjohnson123', role: 'user', first_name: 'Noah', last_name: 'Johnson', phone_number: '7878787878', address: '101 Elm St', city: 'Chicago', state: 'Illinois', zip_code: '60007', country: 'USA', is_active: true, is_verified: true, is_deleted: false, communication_preferences: 'email' },
        
        
        // // ];

        //   userData.forEach((user) => {
        //     const newUser = new UserModel(user);
        //     bcrypt.hash(newUser.password, 10).then((hash) => {newUser.password = hash;});
            
        //     newUser.save()
        //       .then(doc => {
        //         console.log("User saved successfully", doc);
        //       })
        //       .catch(err => {
        //         console.error(err);
        //       });
        //   });

        //sample data insertion ends here
          

        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}



export const deleteUser: RequestHandler = async(req,res,next)=>{
    const userId=req.params.noteId;
    const authenticatedUserId=req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(userId)){
            throw createHttpError(400,"Invalid User id.");
        }
        const userToDelete = await UserModel.findById(userId).exec();

        if(!userToDelete){
            throw createHttpError(404,"User Not Found!");
        }
        if(userToDelete.id===(authenticatedUserId)){
            throw createHttpError(406,"You cannot delete yourself while you are logged in!");
        }


        await userToDelete.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
};