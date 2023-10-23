import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "@/models/form/formSchema"
import Questions from "@/models/question/questionSchema";
import Responses from "@/models/response/responseSchema";
import ResInits from "@/models/responseInitiate/resInitSchema";
export async function POST(req,{params}){
    try{
        const {formId}=params;
        const payload=await req.json();
        const {user_id}=payload;
        await mongoose.connect(process.env.MONGO_URL);
        const resDoc=await Responses.findOne({user:user_id,form:formId});
        if(resDoc){
            return NextResponse.json({ok:false,message:"The reponse was submitted",form:{questions:[]}},{status:400});
        }
        
        const formDoc=await Forms.findById(formId,{responses:0,responses_no:0,})
        .populate({
            path:'owner',
            select:"name username email"
        })
        .populate({
            path:'questions',
            select:"-owner -correct_ans"
        });
        if(!formDoc){
            return NextResponse.json({ok:false,message:"form not found"},{status:400});
        }
        const resInitDoc=await ResInits.findOne({userId:user_id,formId:formId});
        let expTime;
        if(resInitDoc){
            expTime=resInitDoc.expireTime;
        }
        else{
            const curTime=new Date(Date.now());
            curTime.setMinutes(curTime.getMinutes()+formDoc.duration);
            const newResInitDoc=new ResInits({userId:user_id,formId:formId,expireTime:curTime.toISOString()});
            await newResInitDoc.save();
            expTime=curTime.toISOString();
        }
        

        return NextResponse.json({ok:true,message:"form found",form:formDoc,expTime:expTime},{status:200});
    }
    catch(er){
        // console.log(er);
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}