import mongoose from "mongoose"

const todoSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_model"
    }
})
export const todo_model = mongoose.model("Todo",todoSchema);