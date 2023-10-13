import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    owner: {
        //temporary change
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'users',
        // require: true,
        type:String
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions:{
        type:Array,
        require:true
    },
    responses:{
        type:Array,
        require:true
    }
});

const Forms = mongoose.models.forms || mongoose.model("forms", formSchema);

export default Forms;