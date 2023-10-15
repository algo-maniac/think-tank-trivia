import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Users from "@/models/user/userSchema"
import { getServerSession } from "next-auth";

export async function GET(request, { params }) {
    const email=params.email;
    try{
        const session=await getServerSession();
        // console.log("session from servere",session);
        // console.log(process.env.MONGO_URL);
        if(!session){
            return NextResponse.json({ok:false,message:"User not authenticated",user:"unauthenticated"},{status:400});
        }
        if(session.user.email!=email){
            return NextResponse.json({ok:false,message:"User not authorize",user:null},{status:400});
        }
        await mongoose.connect(process.env.MONGO_URL);
        const user=await Users.findOne({email:email},{password:0,responses:0,forms:0});
        if(!user){
            return NextResponse.json({user:null,ok:false,message:"User not found"},{status:400});
        }
        return NextResponse.json({ok:true,user:user,message:"User retrieved successfully"},{status:200});
    }
    catch(err){
        return NextResponse.json({ok:false,message:err.message,user:null},{status:500});
    }
    finally{
    }
}