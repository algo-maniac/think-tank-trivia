import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Users from "@/models/user/userSchema";
import Forms from "@/models/form/formSchema";

export async function GET(req,{params}){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const {user_id,days}=params;
        // console.log(params);
        let curDate=new Date(Date.now());
        curDate.setDate(curDate.getDate()-parseInt(days));
        const userDoc=await Users.findById(user_id,{forms_no:1});
        if(!userDoc){
            return NextResponse.json({ok:false,message:"No user found"},{status:400});
        }
        const formList=await Forms.find({$and:[{owner:{$eq:user_id}},{date:{$gt:curDate}}]},{date:1});
        return NextResponse.json({ok:true,message:"Forms details fetched",data:{forms_no:userDoc.forms_no,forms:formList}},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message},{status:500});
    }
}