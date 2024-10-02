const express = require('express');

const { createTodo, getAllTodos, getTodoById, deleteTodo, updateTodoStatus, sortTodos, pendingTask, AllPendingTodoNotification, timeTakenOfSingleTask, repeatTask, notificationForSingleTAsk} = require('../controller/todoMiddleware');
const auth = require('../middlewares/auth');


let todoRoute = express.Router()


todoRoute.post('/createTodo', auth, createTodo)

todoRoute.get('/getAllTodos',auth, getAllTodos)
todoRoute.get('/sortTodos', sortTodos)


todoRoute.get('/getTodoById/:id',auth, getTodoById)


todoRoute.patch('/updateStatus/:id', updateTodoStatus)
//^delete todo
todoRoute.delete('/deleteTodo/:id', auth, deleteTodo)
// todoRoute.get('/SortTodo', sortTodo)



//get All pending Task
todoRoute.get('/pendingTask',auth,pendingTask)
//sending Notification to all pending task
todoRoute.get('/notification',auth,AllPendingTodoNotification)

//send Notification for single task
todoRoute.get('/notificationForSingleTAsk/:id',auth,notificationForSingleTAsk)

//time Taken to complete the task
todoRoute.get('/timeTakenOfSingleTask/:id',auth,timeTakenOfSingleTask)

//set interval fro task
todoRoute.get('/repeatTask',repeatTask)
// todoRoute.post('/AddLable/:id',AddLable)


module.exports = todoRoute