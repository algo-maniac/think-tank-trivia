import mongoose from "mongoose";

const resInitSchema=new mongoose.Schema({
    formId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forms'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    expireTime:{
        type:String
    },
    responses:[{
        ques_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questions'
        },
        ans_given:{
            type:String
        }
    }]
});

const ResInits = mongoose.models.resInits || mongoose.model("resInits", resInitSchema);

export default ResInits;