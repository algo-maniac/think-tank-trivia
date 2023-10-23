import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Users from "@/models/user/userSchema";
import Forms from "@/models/form/formSchema";

export async function GET(req,{params}){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const {user_id}=params;
        const userDoc=await Users.findById(user_id,{forms_no:1,responses_no:1,avg_score:1});
        if(!userDoc){
            return NextResponse.json({ok:false,message:"user not found"},{status:400});
        }
        const forms_no=userDoc.forms_no;
        const responses_no=userDoc.responses_no;
        const avg_score=userDoc.avg_score;
        const total_forms=await Forms.count();
        return NextResponse.json({ok:true,message:"user details fetched",data:{forms_no,responses_no,total_forms,avg_score}},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}