import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Users from "@/models/user/userSchema";

export async function GET(req,{params}){
    try{
        const {formId}=params;
        await mongoose.connect(process.env.MONGO_URL);
        const responses_list=await Responses.find({form:formId},{user:1,date:1})
        .populate({
            path:'user',
            select:"username"
        });
        return NextResponse.json({ok:true,message:"Response list fetched successfully",responses_list:responses_list},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}