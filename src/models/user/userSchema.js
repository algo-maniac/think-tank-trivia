import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responses'
    }],
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forms'
    }],
    forms_no: {
        type: Number,
        default:0
    },
    responses_no: {
        type: Number,
        default:0
    },
    avg_score: {
        type: Number,
        default:0.0
    },
    avatar: {
        type: String,
        default:"https://avatars.githubusercontent.com/u/100798042?v=4"
    }
});

//to set the responses no automatically
// userSchema.path('forms').set(function (val) {
//     let len = val.length;
//     this.forms_no = len;
//     return val;
// })

// //to set the responses no automatically
// userSchema.path('responses').set(function (val) {
//     let len = val.length;
//     this.responses_no = len;
//     return val;
// })

// console.log("user Schema", mongoose.models.users)
const Users = mongoose.models.users || mongoose.model('users', userSchema);
// const Users= mongoose.model('user',userSchema);


export default Users