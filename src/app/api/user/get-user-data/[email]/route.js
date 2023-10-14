import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Users from "@/models/user/userSchema"

export async function GET(request, { params }) {
    const email=params.email;
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const user=await Users.findOne({email:email});
        if(!user){
            return NextResponse.json({user:null},{status:200});
        }
        return NextResponse.json({user:user},{status:200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({err:err.message},{status:500});
    }
    finally{
        await mongoose.disconnect();
    }
}