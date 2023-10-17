import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Forms from "@/models/form/formSchema";
import Users from "@/models/user/userSchema";
import Questions from "@/models/question/questionSchema";
export async function POST(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const payload = await req.json();//payload={mode(UserId(username),URL(form id)),input}
        // There are two modes url, and username
        const { mode, input } = payload;
        if (mode == "URL") {
            const formId = input;
            const formDoc = await Forms.findById(formId, { form_name:1, date:1, responses_no:1, questions_no:1 })
                .populate({
                    path: 'owner',
                    select: "name username email"
                });
            if (!formDoc) {
                return NextResponse.json({ ok: false, message: "form not found" }, { status: 400 });
            }
            return NextResponse.json({ ok: true, message: "form found", form: formDoc }, { status: 200 });
        }
        else {
            const username = input;
            let userDoc = await Users.findOne({username:username}, { forms: 1, forms_no: 1 })
                .populate({
                    path: "forms",
                    select: "form_name date responses_no questions_no "
                });
            if (!userDoc) {
                return NextResponse.json({ ok: false, message: "user not found" }, { status: 400 });
            }
            return NextResponse.json({ ok: true, message: "Forms list retrieved successfully", formsList: userDoc.forms }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    }
}