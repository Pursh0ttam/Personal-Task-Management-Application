const todoModel = require("../model/todo.model")
const label = require("../model/label.model")



//enter your Project name
const labelName = async(req,res,next)=>{
    try {
        let value = req.body
        if(!value.title){
            return res.status(404).send({
                success:false,
                message:"please provide title"
            })
        }
        let labelName = new label({...value})
        await labelName.save()
       return res.status(201).send({
            success: true,
            message: "Folder created successfully",labelName
        })
        
    } catch (error) {
        next(error)
        
    }
}


// fetch todoes by label
const tasksBylabelName = async(req,res,next)=>{
    try {
        let PID = req.params.id
        console.log("this is PID",PID)
        if(!PID){
            return res.status(404).send({
                success:false,
                message:"please provide label id"
            })
        }
        let tasks = await todoModel.find({label:PID})
       
       return res.status(201).send({
            success: true,
            message: "todos fetched on the basis of label successfully",tasks
        })
        
    } catch (error) {
        next(error)
        
    }
}

module.exports={labelName,tasksBylabelName}