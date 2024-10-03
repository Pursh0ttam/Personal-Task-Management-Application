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
            sendmail(user.Email, [task.title])
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
            sendmail(user.Email, pendingTask)
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
        console.log("this is status", status);
        if (status === "completed") {
            time = new Date(updatedAt) - new Date(createdAt)
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours, status
            })
        }
        else if (status === "in-process") {
            time = new Date(updatedAt) - new Date(createdAt)
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours
            })
        }
        else {
            let time = new Date() - new Date(createdAt);
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours
            })
        }


    } catch (error) {
        next(error)
    }

}


//^ repeating task at very-day ||week ||month   by using logics



// const repeatTask = async (req, res,next) => {
//     let current = new Date()
//     let hours = current.getHours()
//     let weekday = current.getDay()
//     let month = current.getMonth() + 1

//     try {
//         const { id } = req.body
//         let user = await userModel.findById(id)
//         if (!user) {
//             return res.send({
//                 success: false,
//                 message: "user not found"
//             })
//         }
// // repeat task for every day 
// if (hours === 9) {
//     sendmail(user.Email,"create your daily task")
//     createTodo()
// }
// // repeat task for every week 
// if (weekday === 7) {
//     sendmail(user.Email,"create your weekly task")
//     createTodo()
// }
// // repeat task for every month 
//         if (month === 1) {
//             sendmail(user.Email,"create your yearly task")
//             createTodo()
//         }

//     } catch (error) {
//         next(error)
//     }
// }

// by 3rd part-library
// repeating task everyDay || everyWeek || everyMonth
// let everyday
// let everydaySchdule = async(req,res)=>{
//      const { id } = req.body
//         let user = await userModel.findById(id)
//         if (!user) {
//             return res.send({
//                 success: false,
//                 message: "user not found"
//             })
//         }

//      everyday = cron.schedule('* * * * sun mon tue wed thr fri sat sun', () => {
//         sendmail(user.Email,"create your weekly task")
//         createTodo()
//     })
// }

// //end the task
// let EndeverydaySchdule = async(req,res)=>{
//       everyday.stop()
//   }

// //^ for every week 
// let everyWeek
// let everyWeekSchdule = async(req,res)=>{
//     const { id } = req.body
//         let user = await userModel.findById(id)
//         if (!user) {
//             return res.send({
//                 success: false,
//                 message: "user not found"
//             })
//         }
//    everyWeek =  cron.schedule('* * * * mon', () => {
//       sendmail(user.Email,"create your weekly task")
//         createTodo()   
//       });
// }

// let EndEverydaySchdule=async(req,res)=>{
//     everyWeek.stop()
// }


// //^ for every month


// let everyMonth
// let everyMonthSchdule = async(req,res)=>{
//     const { id } = req.body
//         let user = await userModel.findById(id)
//         if (!user) {
//             return res.send({
//                 success: false,
//                 message: "user not found"
//             })
//         }

//     everyMonth =  cron.schedule('* * * Jan Sun', () => {
//           sendmail(user.Email,"create your weekly task")
//         createTodo()  
//     });
  
// }

// let EndeveryMonthSchdule=async(req,res)=>{
//     everyMonth.stop()
// }









module.exports = { createTodo, getAllTodos,sortTodos, getTodoById,updateTodoStatus, deleteTodo,timeTakenOfSingleTask,AllPendingTodoNotification,pendingTask,notificationForSingleTAsk }