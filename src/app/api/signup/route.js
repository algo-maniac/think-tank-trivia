import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import Users from "@/models/user/userSchema";

export async function POST(request){
    const payload=await request.json();
    const {password,confirm_password}=payload;
    if(password!=confirm_password){
        return NextResponse.json({ok:false,message:"Confirm password did not matched"},{status:400});
    }
    await mongoose.connect(process.env.MONGO_URL);
    let user=await Users.findOne({$or:[{email:{$eq:payload.email}},{username:{$eq:payload.username}}]});
    if(user){
        return NextResponse.json({ok:false,message:"The email or username already exists"},{status:400});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(payload.password,salt);
    //creating new user account
    user=new Users({name:payload.name,email:payload.email,username:payload.username,password:hashedPassword});
    await user.save();
    return NextResponse.json({ok:true,message:"Sign up successful"},{status:200});
}