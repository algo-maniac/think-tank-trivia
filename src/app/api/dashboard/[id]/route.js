import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Form from "./../../../../models/form/formSchema"
export async function GET(req,res){
    // console.log(res.params.id);
    let data=[];
    try{
        // await mongoose.connect("mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/test/Project3/form");
        // data=await Form.findById("6528e88fef5d4b45b3825964");
        // console.log(data);
    }
    catch(er){
        console.log(er);
    }
    return NextResponse.json({msg:"success"});
}