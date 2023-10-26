import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Users from "@/models/user/userSchema";
import Questions from "@/models/question/questionSchema";
import Forms from "@/models/form/formSchema";
import { getServerSession } from "next-auth";

export async function GET(req,{params}){
    try{
        const {resId}=params;
        await mongoose.connect(process.env.MONGO_URL);
        const resDoc=await Responses.findById(resId)
        .populate({
            path:'user',
            select:"username email"
        })
        .populate({
            path:'form',
            select:"form_name owner",
            populate:{
                path:'owner',
                select:"email"
            }
        })
        .populate({
            path:'responses.ques_id',
            select:"-owner "
        });
        const session=await getServerSession();
        if(!session){
            return NextResponse.json({ok:false,message:"The user is not authenticated"},{status:400});
        }
        if(session.user.email==resDoc.user.email || session.user.email==resDoc.form.owner.email){
            return NextResponse.json({ok:true,message:"Response list fetched successfully",response_details:resDoc},{status:200});
        }
        // if(session.user.email!=resDoc.user.email){
            let newDoc={...resDoc,responses:[]}
            return NextResponse.json({ok:true,message:"Response list fetched successfully",response_details:newDoc},{status:200});
        // }
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}