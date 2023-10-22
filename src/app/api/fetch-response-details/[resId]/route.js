import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Users from "@/models/user/userSchema";
import Questions from "@/models/question/questionSchema";
import Forms from "@/models/form/formSchema";

export async function GET(req,{params}){
    try{
        const {resId}=params;
        await mongoose.connect(process.env.MONGO_URL);
        const resDoc=await Responses.findById(resId)
        .populate({
            path:'user',
            select:"username "
        })
        .populate({
            path:'form',
            select:"form_name "
        })
        .populate({
            path:'responses.ques_id',
            select:"-owner "
        });
        return NextResponse.json({ok:true,message:"Response list fetched successfully",response_details:resDoc},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}