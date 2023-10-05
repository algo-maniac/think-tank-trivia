import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    date:{
        type: Date, 
        default: Date.now
    }
});

const Users=mongoose.models.users || mongoose.model('users',userSchema);

export default Users