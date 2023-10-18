import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Forms from "@/models/form/formSchema";
import Users from "@/models/user/userSchema";


export async function POST(req,{params}){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const {formId}=params;
        const payload=await req.json();
        const {user_id,answer}=payload;
        let resDoc=await Responses.findOne({user:user_id,form:formId});
        if(resDoc){
            return NextResponse.json({ok:false,message:"The reponse was submitted"},{status:400});
        }
        // console.log("serverside",answer);
        // let responses=[];
        // for(let it of answer){
        //     responses.push({ques_id:it[0],ans_given:it[1]});
        // }
        resDoc=new Responses({user:user_id,form:formId,responses:answer});
        await resDoc.save();
        const userDoc=await Users.findById(user_id);
        const formDoc=await Forms.findById(formId);
        userDoc.responses.push(resDoc._id);
        formDoc.responses.push(resDoc._id);
        userDoc.responses_no=userDoc.responses.length;
        formDoc.responses_no=formDoc.responses.length;
        await userDoc.save();
        await formDoc.save();
        return NextResponse.json({ok:true,message:"response submitted successfully"},{status:200})
    }
    catch(er){
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}