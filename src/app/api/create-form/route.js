import mongoose from "mongoose";
import Questions from "@/models/question/questionSchema";
import Forms from "../../../models/form/formSchema";
import { NextResponse } from "next/server";
export async function POST(request){
    // console.log(res.params.id);
    mongoose.connect(process.env.MONGO_URL);
    let payload=await request.json();
    let owner="tuhin727066@gmail.com";
    let name="Form";
    let date=new Date();
    // console.log(payload.data[0].value);
    console.log("payload",payload);
    let question=[];
    for(let i=0;i<payload.data.length;i++){
        // question.push(payload.data[i].value)
        const ques={owner:owner,ques_type:"TEXT",question:payload.data[i].value.question};
        let doc=new Questions(ques);
        await doc.save();
        question.push(doc._id);
    }
    let newForm={owner:owner,name:name,questions:question};
    let doc=new Forms(newForm);
    await doc.save();
    let responses=[];
    console.log(owner,name,date,question,responses);
    return NextResponse.json({msg:"form added"});
}