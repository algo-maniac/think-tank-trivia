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
        type: Number
    },
    responses_no: {
        type: Number
    },
    avg_score: {
        type: mongoose.Schema.Types.Decimal128,
    },
    avatar: {
        type: String
    }
});

//to set the responses no automatically
userSchema.path('forms').set(function (val) {
    let len = val.length;
    this.forms_no = len;
    return val;
})

//to set the responses no automatically
userSchema.path('responses').set(function (val) {
    let len = val.length;
    this.responses_no = len;
    return val;
})

// console.log("user Schema", mongoose.models.users)
const Users = mongoose.models.users || mongoose.model('users', userSchema);
// const Users= mongoose.model('user',userSchema);


export default Users