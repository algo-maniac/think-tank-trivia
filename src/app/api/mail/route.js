import { NextResponse } from "next/server";

export async function POST(req,res){
    const payload = await req.json();
    console.log(payload.email);
    const email = payload.email;
    return NextResponse.json({ok:true,message:"mail fetched successfully"},{status:200});
}