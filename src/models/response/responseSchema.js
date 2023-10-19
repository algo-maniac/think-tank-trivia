import mongoose from "mongoose";

const ansSchema=new mongoose.Schema({
    ques_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    ans_given:{
        type:String
    }
});

const responseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forms'
    },
    responses: [{
        type:ansSchema
    }],
    marks_obtained: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Responses = mongoose.models.responses || mongoose.model("responses", responseSchema);

export default Responses;