const OrganiseSchema = require("../model/organise.model")
const todoModel = require("../model/todo.model")



//enter your Project name
const ProjectName = async(req,res,next)=>{
    try {
        let value = req.body
        if(!value.title){
            return res.status(404).send({
                success:false,
                message:"title not found"
            })
        }
        let projectName = new OrganiseSchema({...value})
        await projectName.save()
       return res.status(201).send({
            success: true,
            message: "Folder created successfully",projectName
        })
        
    } catch (error) {
        next(error)
        
    }
}


// fetch todoes by project name
const tasksByprojectName = async(req,res,next)=>{
    try {
        let PID = req.params.id
        console.log("this is PID",PID)
        if(!PID){
            return res.status(404).send({
                success:false,
                message:"please provide projectName id"
            })
        }
        let projectName = await todoModel.find({projectId:PID})
       
       return res.status(201).send({
            success: true,
            message: "Todos fetched successfully by project name",projectName
        })
        
    } catch (error) {
        next(error)
        
    }
}

module.exports={ProjectName,tasksByprojectName}