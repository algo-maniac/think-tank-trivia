import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
import Responses from "@/models/response/responseSchema";
import Forms from "@/models/form/formSchema";
import Users from "@/models/user/userSchema";
import Questions from "@/models/question/questionSchema";
import ResInits from "@/models/responseInitiate/resInitSchema";


export async function POST(req,{params}){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const {formId}=params;
        const payload=await req.json();
        let {user_id,answer}=payload;
        let resDoc=await Responses.findOne({user:user_id,form:formId});
        if(resDoc){
            return NextResponse.json({ok:false,message:"The reponse was submitted"},{status:400});
        }
        // console.log("serverside",answer);
        // let responses=[];
        // for(let it of answer){
        //     responses.push({ques_id:it[0],ans_given:it[1]});
        // }

        // marks calculation
        let total_obtain=0;
        const resInitDoc=await ResInits.findOne({userId:user_id,formId:formId});
        if(!resInitDoc){
            return NextResponse.json({ok:false,message:"not-initiated"},{status:400});
        }
        let curTime=new Date(Date.now());
        let exp=new Date(resInitDoc.expireTime);
        exp.setMinutes(exp.getMinutes()+2);
        if(curTime>exp){
            answer=resInitDoc.responses;
        }
        // let total_attempt=0;
        for(let it of answer){
            const quesDoc=await Questions.findById(it.ques_id,{correct_ans:1,marks:1,ques_type:1});
            if(quesDoc.ques_type=="TEXT"){
                total_obtain+=quesDoc.marks;
            }
            else if(quesDoc.ques_type=="MCQ"){
                if(it.ans_given==quesDoc.correct_ans){
                    total_obtain+=quesDoc.marks;
                }
            }
            // total_attempt++;
        }
        // marks calculation complete
        const formDoc=await Forms.findById(formId);
        let total_marks=formDoc.total_marks;
        // total_question =formDoc.questions_no;
        let percentage_obtained=(total_obtain/total_marks)*100;

        resDoc=new Responses({user:user_id,form:formId,responses:answer,percentage_obtained:percentage_obtained});
        await resDoc.save();
        const userDoc=await Users.findById(user_id);
        // const formDoc=await Forms.findById(formId);
        userDoc.responses.push(resDoc._id);
        formDoc.responses.push(resDoc._id);
        //updating avg_score
        let total=userDoc.avg_score*userDoc.responses_no;
        total+=percentage_obtained;
        let new_avg_score=total/(userDoc.responses_no+1);
        userDoc.avg_score=new_avg_score;
        //avg_score updation complete
        userDoc.responses_no=userDoc.responses.length;
        formDoc.responses_no=formDoc.responses.length;
        await userDoc.save();
        await formDoc.save();
        await ResInits.deleteOne({userId:user_id,formId:formId});
        return NextResponse.json({ok:true,message:"response submitted successfully"},{status:200})
    }
    catch(er){
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}