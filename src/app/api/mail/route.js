import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req, res) {
    const payload = await req.json();
    console.log(payload.email);
    const email = payload.email;


    try {

        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        const mailData = {
            from: process.env.GMAIL,
            to: email,
            subject: "think-fast-trivia Invitation",
            html: "<h1>Check Out This Amazing Website :- https://think-fast-trivia.vercel.app/ </h1>"
        };


        await new Promise((resolve, reject) => {
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });

        res.status(200).json({ message: "Email sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}