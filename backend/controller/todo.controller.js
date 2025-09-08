import { todo_model } from "../model/todo.model.js";
export const createTodo= async (req,res)=>{
    const {name,completed}=req.body;
    if((name=="")){
      return res.status(400).json({message:"task name  can not be empty"})
    }
    const user=req.user;
    
    const todo=await todo_model.create({
      name,
      completed,
      user:user._id
    })
    return res.status(200).json({message:"work added succesfully",todo})

}


export const getTodo=async (req,res)=>{

     try {
      const user=req.user;
      const todos=await todo_model.find({user:user._id});
    
      
      // if(todos.length===0){
      //   return res.status(404).json({message:"no todo available ujjwal"})
      // }
      return res.status(200).json({message:"fetched succesfully",todos})
     } catch (error) {
       return res.status(501).json({message:"error occured in fetching"})
     }
}


export const updateTodo=async (req,res)=>{
    try {
      const {id}=req.params;
      const availabletodo = await todo_model.findById(id);
      if(!availabletodo){
        return res.status(404).json({message:"todo not available"})
      }
      console.log(availabletodo.completed);
      
      availabletodo.completed=!availabletodo.completed;
        
        await availabletodo.save();
     
      return res.status(200).json({message:"updated successfuly",availabletodo})
    } catch (error) {
        return res.status(501).json({message:"error occured in updating"})
    }

}

export const deleteTodo=async (req,res)=>{
    try {
      const {id}=req.params;
      const availableTodo = await todo_model.findByIdAndDelete(id);
      if(!availableTodo){
        return res.status(404).json({message:"todo not available"})
      }
      return res.status(200).json({message:"deleted succcessfuly"})
    } catch (error) {
      if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
      return res.status(500).json({message:"error occured in deleting"})
    }
}