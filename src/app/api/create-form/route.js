import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from '../../../models/form/formSchema'
export async function POST(request){
    // console.log(res.params.id);
    let payload=await request.json();
    let owner="Tsaha11";
    let name="Form";
    let date=new Date();
    // console.log(payload.data[0].value);
    let question=[];
    for(let i=0;i<payload.data.length;i++){
        question.push(payload.data[i].value)
    }
    let responses=[];
    console.log(owner,name,date,question,responses);
    return NextResponse.json({msg:"form added"});
}