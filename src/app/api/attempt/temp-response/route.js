import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
// import Responses from "@/models/response/responseSchema";
import Forms from "@/models/form/formSchema";
import Users from "@/models/user/userSchema";
import Questions from "@/models/question/questionSchema";
import ResInits from "@/models/responseInitiate/resInitSchema";


export async function POST(req,{params}){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const payload=await req.json();
        let {userId,formId,responses}=payload;
        const resInitDoc=await ResInits.findOne({userId:userId,formId:formId});
        if(!resInitDoc){
            return NextResponse.json({ok:false,message:"not-initiated"},{status:400});
        }
        let curTime=new Date(Date.now());
        let exp=new Date(resInitDoc.expireTime);
        exp.setMinutes(exp.getMinutes()+2);
        if(curTime>exp){
            return NextResponse.json({ok:false,message:"Time expried"},{status:400});
        }
        resInitDoc.responses=responses;
        await resInitDoc.save();
        return NextResponse.json({ok:true,message:"temp response stored successfully"},{status:200})
    }
    catch(er){
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}