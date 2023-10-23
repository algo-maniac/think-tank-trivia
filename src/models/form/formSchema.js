import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    form_name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }],
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responses'
    }],
    questions_no:{
        type: Number,
        default:0
    },
    responses_no:{
        type: Number,
        default:0
    },
    total_marks:{
        type: Number,
        default:0.0
    }
});

// //to set the responses no automatically
// formSchema.path('responses').set(function (val) {
//     let len = val.length;
//     this.responses_no = len;
//     return val;
// })

// //to set the questions no automatically
// formSchema.path('questions').set(function (val) {
//     let len = val.length;
//     this.questions_no = len;
//     return val;
// })


const Forms = mongoose.models.forms || mongoose.model("forms", formSchema);

export default Forms;