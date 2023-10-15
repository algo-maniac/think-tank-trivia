import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "@/models/form/formSchema";
export async function POST(req,res){
    // console.log(res.params.id);
    const payload=await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const email=payload.email;
    console.log(email);
    try{

    }
    catch(er){
    }
    return NextResponse.json({ok:false,msg:'Error from server side'})
}