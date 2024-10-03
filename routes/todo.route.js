const express = require('express');

const { createTodo, getAllTodos, getTodoById, deleteTodo, updateTodoStatus, sortTodos, pendingTask, AllPendingTodoNotification, timeTakenOfSingleTask,notificationForSingleTAsk } = require('../controller/todo.controller');
const auth = require('../middlewares/auth');


let todoRoute = express.Router()


todoRoute.post('/createTodo', auth, createTodo)

todoRoute.get('/getAllTodos', auth, getAllTodos)

todoRoute.get('/sortTodos', sortTodos)


todoRoute.get('/getTodoById/:id', auth, getTodoById)

todoRoute.patch('/updateStatus/:id', updateTodoStatus)
//^delete todo
todoRoute.delete('/deleteTodo/:id', auth, deleteTodo)




//get All pending Task
todoRoute.get('/pendingTask', auth, pendingTask)
//sending Notification to all pending task
todoRoute.get('/notification', auth, AllPendingTodoNotification)

//send Notification for single task
todoRoute.get('/notificationForSingleTAsk/:id', auth, notificationForSingleTAsk)

//time Taken to complete the task
todoRoute.get('/timeTakenOfSingleTask/:id', auth, timeTakenOfSingleTask)




module.exports = todoRoute