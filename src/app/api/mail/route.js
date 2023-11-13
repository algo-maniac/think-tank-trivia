import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req,res){
    const payload = await req.json();
    console.log(payload.email);
    const email = payload.email;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:process.env.GMAIL,
                pass:process.env.PASSWORD,
            }
        });

        const mailOptions = {
            from : process.env.GMAIL,
            to : email,
            subject : "think-fast-trivia Invitation",
            html : "<h1>Check Out This Amazing Website :- https://think-fast-trivia.vercel.app/ </h1>"
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error : "+error);
            }else{
                console.log("email sent "+ info.response);
                return NextResponse.json({ok:true,message:"mail fetched successfully"},{status:200});
            }
        })   
    } catch (error) {
        console.log("error : ",error);
        return NextResponse.json({ok:true,message:"mail is not fetched"},{status:404});
    }
}