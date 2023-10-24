import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Users from "@/models/user/userSchema";

export async function GET(req,{params}){
    try{
        const {user_id}=params;
        await mongoose.connect(process.env.MONGO_URL);
        const responses_list=await Responses.find({user:user_id},{user:1,date:1,percentage_obtained:1})
        .populate({
            path:'user',
            select:"name"
        })
        .populate({
            path:'form',
            select:"form_name"
        });
        return NextResponse.json({ok:true,message:"Response list fetched successfully",responses_list:responses_list},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}