import { NextResponse } from "next/server";
export async function POST(req){
    const payload=await req.json();
    console.log('Server Side');
    console.log(payload);
    // There are two modes url, and username
    return NextResponse.json({msg:"Success"})
}