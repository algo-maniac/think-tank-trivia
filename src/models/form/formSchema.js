import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    owner: {
        type: String,
        require:true,
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