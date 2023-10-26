import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "./../../../../models/form/formSchema"
import Questions from "@/models/question/questionSchema";
import { getServerSession } from "next-auth";
export async function GET(req,{params}){
    try{
        const {id:formId}=params;
        const session=await getServerSession();
        if(!session){
            return NextResponse.json({ok:false,message:"The user is not authenticated"},{status:400});
        }
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
        if(session.user.email!=formDoc.owner.email){
            let newDoc={...formDoc,questions:[]}
            return NextResponse.json({ok:true,message:"form found",form:newDoc},{status:200});
        }
        return NextResponse.json({ok:true,message:"form found",form:formDoc},{status:200});
    }
    catch(er){
        // console.log(er);
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}