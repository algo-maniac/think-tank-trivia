import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Forms from "@/models/form/formSchema"
import Questions from "@/models/question/questionSchema";
import Responses from "@/models/response/responseSchema";
import ResInits from "@/models/responseInitiate/resInitSchema";
import Users from "@/models/user/userSchema";
// import { getServerSession } from "next-auth";
export async function POST(req,{params}){

    async function autoSubmit(user_id,formId){
        try{
            await mongoose.connect(process.env.MONGO_URL);
            let resDoc=await Responses.findOne({user:user_id,form:formId});
            if(resDoc){
                // return NextResponse.json({ok:false,message:"The reponse was submitted"},{status:400});
                return ;
            }
            let total_obtain=0;
            const resInitDoc=await ResInits.findOne({userId:user_id,formId:formId});
            if(!resInitDoc){
                // return NextResponse.json({ok:false,message:"not-initiated"},{status:400});
                return ;
            }
            // let answer;
            let answer=resInitDoc.responses;
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
        }
        catch(err){
            // return NextResponse.json({ok:false,message:er.message},{status:500});
            // console.log("error on auto submit at backend",err.message);
        }
    }

    try{
        const {formId}=params;
        const payload=await req.json();
        const {user_id}=payload;
        await mongoose.connect(process.env.MONGO_URL);
        const resDoc=await Responses.findOne({user:user_id,form:formId});
        if(resDoc){
            return NextResponse.json({ok:false,message:"The reponse was submitted",form:{questions:[]}},{status:400});
        }
        
        const formDoc=await Forms.findById(formId,{responses:0,responses_no:0,})
        .populate({
            path:'owner',
            select:"name username email"
        })
        .populate({
            path:'questions',
            select:"-owner -correct_ans"
        });
        if(!formDoc){
            return NextResponse.json({ok:false,message:"form not found"},{status:400});
        }
        if(formDoc.owner._id==user_id){
            return NextResponse.json({ok:false,message:"Owner",form:{questions:[]}},{status:400});
        }
        const resInitDoc=await ResInits.findOne({userId:user_id,formId:formId});
        let expTime;
        if(resInitDoc){
            expTime=resInitDoc.expireTime;
        }
        else{
            const curTime=new Date(Date.now());
            curTime.setMinutes(curTime.getMinutes()+formDoc.duration);
            const newResInitDoc=new ResInits({userId:user_id,formId:formId,expireTime:curTime.toISOString()});
            await newResInitDoc.save();
            expTime=curTime.toISOString();
            setTimeout(()=>{autoSubmit(user_id,formId)},(formDoc.duration+5)*60000);
        }
        
        return NextResponse.json({ok:true,message:"form found",form:formDoc,expTime:expTime},{status:200});
    }
    catch(er){
        // console.log(er);
        return NextResponse.json({ok:false,message:er.message},{status:500});
    }
}