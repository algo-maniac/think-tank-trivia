import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "./../../../../models/form/formSchema"
import Questions from "@/models/question/questionSchema";
export async function GET(req,{params}){
    try{
        const {id:formId}=params;
        await mongoose.connect(process.env.MONGO_URL);
        const formDoc=await Forms.findById(formId,{responses:0})
        .populate({
            path:'owner',
            select:"name username email"
        })
        .populate({
            path:'questions',
            select:"-owner"
        });
        if(!formDoc){
            return NextResponse.json({ok:false,message:"form not found"},{status:400});
        }
        return NextResponse.json({ok:true,message:"form found",form:formDoc},{status:200});
    }
    catch(er){
        console.log(er);
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}