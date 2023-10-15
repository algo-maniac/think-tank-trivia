import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "@/models/form/formSchema";
import Users from "@/models/user/userSchema";
export async function POST(req){
    // console.log(res.params.id);
    try{
        const {user_id}=await req.json();
        mongoose.connect(process.env.MONGO_URL);
        let userDoc = await Users.findById(user_id,{forms:1, forms_no:1})
        .populate({
            path:"forms",
            select:"form_name date responses_no questions_no "
        });
        if(!userDoc){
            return NextResponse.json({ ok: false, message: "user not found" },{status:400});   
        }
        return NextResponse.json({ ok: true, message: "Forms list retrieved successfully", formsList:userDoc.forms },{status:200});  
    }
    catch(er){
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
    
}