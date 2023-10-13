import mongoose from "mongoose";
import { NextResponse } from "next/server";
export function POST(req,res){
    // console.log(res.params.id);
    console.log('Server Side');
    console.log(req.method)
    console.log(req.body.data)
    return NextResponse.json({msg:"succesds"});
}