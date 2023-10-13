import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    owner: {
        //temporary change
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'users'
        // require:true,
        type:String
    },
    ques_type: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    a: {
        type: String
    },
    b: {
        type: String
    },
    c: {
        type: String
    },
    d: {
        type: String
    },
    correct_ans: {
        type: String
    },
    marks: {
        type: Number,
        require: true,
        default: 1
    },
    topic: {
        type: String,
        default: "General"
    },
    diagram: {
        type: String
    }
});

const Questions = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Questions;