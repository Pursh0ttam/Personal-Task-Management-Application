const OrganiseSchema = require("../model/organise.model")
const todoModel = require("../model/todo.model")
const userModel = require("../model/user.model")
const { sendmail } = require("../sendNotification/sendnotification")




const createTodo = async (req, res,next) => {
    console.log(req.body)
    try {
        let values = req.body        
        if (!values.title ||!values.description||!values.dueDate||!values.status) {
            return res.status(500).send({
                success: false,
                message: "please fill all the input fields"
            })
        }
        //setting priority
        // if(values.todotype===)
        let newTodo = new todoModel({ ...values })
        await newTodo.save()
       return res.status(201).send({
            success: true,
            message: "new todo created successfully"
        })
    } catch (error) {
        next(error)
    }

}

const getAllTodos = async (req, res,next) => {
    try {

        let todos = await todoModel.find({})
        if (!todos) {
            return res.send({
                success: false,
                message: "no tasks found"
            })
        }
        return res.status(200).send({
            success: true,
            TotalCount: todos.length,
            todos
        })
    } catch (error) {
        next(error)
    }
}
const sortTodos = async (req, res,next) => {

    try {
        let todos = await todoModel.find({})
        if (!todos) {
            return res.send({
                success: false,
                message: "no tasks found"
            })
        }
        //^sorting on the basis of high,medium,low
        if(req.query.sort==='high'){
            let SortOrder={
                high:1,
                medium:2,
                low:3
            }
            todos.sort((a,b)=>SortOrder[a.prority]-SortOrder[b.prority])
        }

        //^sorting on the basis of low,medium,high
        if(req.query.sort==='low'){
            let SortOrder={
                high:3,
                medium:2,
                low:1
            }
            todos.sort((a,b)=>SortOrder[a.prority]-SortOrder[b.prority])
        }


        return res.status(200).send({
            success: true,
            TotalCount: todos.length,
            todos
        })
    } catch (error) {
        next(error)
    }
}

const updateTodoStatus = async (req, res,next) => {
    console.log("this is id to update",req.params.id);
    try {
        let TodoId = req.params.id
        if (!TodoId) {
            return res.status(404).send({
                success: false,
                message: "please provide task id"
            })
        }
        let todo = await todoModel.findById(TodoId)
        console.log("this is todo",todo);
        console.log("this is req body",req.body);
        if (!todo) {
            return res.status(500).send({
                success: false,
                message: "no tasks found"
            })
        }
        //updating status
        let {status} = req.body
        todo.status=status
        todo.save()
        return res.status(200).send({
            success: true,
            message: "task founded", todo
        })

    } catch (error) {
        next(error)
    }
}

const getTodoById = async (req, res,next) => {
    console.log(req.params.id);
    try {
        let TodoId = req.params.id
        if (!TodoId) {
            return res.status(404).send({
                success: false,
                message: "please provide todo id"
            })
        }
        let task = await todoModel.findById(TodoId)
        if (!task) {
            return res.status(500).send({
                success: false,
                message: "no task found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "task founded", task
        })

    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (req, res,next) => {
    try {
        let todoId = req.params.id
        if (!todoId) {
            res.status(404).send({
                success: false,
                message: "please provide id of task"
            })
        }

        let task = await todoModel.findByIdAndDelete(todoId)
        if (!task) {
            return res.status(404).send({
                success: false,
                message: "task not deleted due to wrong task id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "task deleted successfully",
            task
        })

    } catch (error) {
        next(error)
    }

}


// --------------------------------------------------------------------------------------------


let pendingTask = async (req, res,next) => {
    try {
        let pendingTask = await todoModel.find({ status: "pending" })
        res.status(201).send({
            success: true,
            message: "todo fetched successfully",
            size: pendingTask.length,
            pendingTask
        })

    } catch (error) {
        next(error)
    }
}

const notificationForSingleTAsk = async (req, res,next) => {
    try {
        let todoId = req.params.id
        let userId = req.body.id
        let task = await todoModel.findById(todoId)
        let user = await userModel.findById(userId)
       
        if(task.status==='pending'){
            sendmail(user.Email,"Please complete tese tasks" [task.title])
           return res.status(201).send({
                success: true,
                message: "Notification send successfully",
                size: pendingTask.length,
                pendingTask
            })
        }
        else{
            return res.status(404).send({
                success:false,
                message:"these task is already completed"
            })

        }
        
    } catch (error) {
        next(error)
        
    }
   
}

const AllPendingTodoNotification = async (req, res,next) => {
    try {
        const { id } = req.body
        // console.log("this is id",id);
        let user = await userModel.findById(id)
        if (!user) {
            return res.send({
                success: false,
                message: "user not found"
            })
        }
        let pendingTask = await todoModel.find({ status: "pending" })
        if(pendingTask){
            sendmail(user.Email,"Please complete tese tasks" [task.title])
            res.status(201).send({
                success: true,
                message: "Notification send successfully",
                size: pendingTask.length,
                pendingTask
            })
        }
        else{
            return res.status(404).send({
                success:false,
                message:"There is no pending task "
            })

        }
    } catch (error) {
        next(error)
    }

}

//time Taken to complete the task
const timeTakenOfSingleTask = async (req, res,next) => {
    try {
        let todoId = req.params.id
        if (!todoId) {
            return res.send({
                success: false,
                message: "please provid id"
            })
        }
        let { createdAt, status, updatedAt } = await todoModel.findById(todoId)
      
        if (status === "completed") {
        let time = new Date(updatedAt) - new Date(createdAt);

        let days = Math.floor(time / (24 * 3600000));
        let hours = Math.floor((time % (24 * 3600000)) / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
            return res.send({
                success: true,
                 status,
                timeTaken:`${days} days, ${hours} hours, ${minutes} minutes`
            })
        }
        else if (status === "in-process") {
            time = new Date(updatedAt) - new Date(createdAt)

            let days = Math.floor(time / (24 * 3600000));
            let hours = Math.floor((time % (24 * 3600000)) / 3600000);
            let minutes = Math.floor((time % 3600000) / 60000);
            return res.send({
                success: true,
                 status,
                timeTaken:`${days} days, ${hours} hours, ${minutes} minutes`
            })
        }
        else {
            let time = new Date() - new Date(createdAt);

            let days = Math.floor(time / (24 * 3600000));
            let hours = Math.floor((time % (24 * 3600000)) / 3600000);
            let minutes = Math.floor((time % 3600000) / 60000);
            return res.send({
                success: true,
                 status,
                timeTaken:`${days} days, ${hours} hours, ${minutes} minutes`
            })
        }

    } catch (error) {
        next(error)
    }

}

module.exports = { createTodo, getAllTodos,sortTodos, getTodoById,updateTodoStatus, deleteTodo,timeTakenOfSingleTask,AllPendingTodoNotification,pendingTask,notificationForSingleTAsk }