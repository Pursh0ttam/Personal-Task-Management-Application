const userModel = require("../model/user.model")
const { sendmail } = require("../sendNotification/sendnotification")
const { createTodo } = require("./todo.controller")
const cron = require('node-cron');


let everyday
let everydaySchdule = async (req, res,next) => {
    try {
        const { id } = req.body
        let user = await userModel.findById(id)
        if (!user) {
        return res.send({
            success: false,
            message: "user not found"
        })
    }

    everyday = cron.schedule('* * * * * sun mon tue wed thr fri sat sun', () => {
        sendmail(user.Email,[] ,"create your weekly task")
        createTodo()
    })
    return res.status(200).send({
        success:true,
        message:"task scheduled everyday"
    })
        
    } catch (error) {
        next(error)
        
    }
    
}

//end the task
let EndeverydaySchdule = async (req, res,next) => {
    try {
        everyday.Stop()
        return res.status(200).send({
            success:true,
            message:"task End for everyday"
        })
        
    } catch (error) {
        next(error)
        
    }
}

//^ for every week 
let everyWeek
let everyWeekSchdule = async (req, res) => {
    const { id } = req.body
    let user = await userModel.findById(id)
    if (!user) {
        return res.send({
            success: false,
            message: "user not found"
        })
    }
    everyWeek = cron.schedule('* * * * mon', () => {
        sendmail(user.Email, "create your weekly task")
        createTodo()
    });
}

let EndEveryWeekSchdule = async (req, res) => {
    everyWeek.stop()
}


//^ for every month


let everyMonth
let everyMonthSchdule = async (req, res) => {
    const { id } = req.body
    let user = await userModel.findById(id)
    if (!user) {
        return res.send({
            success: false,
            message: "user not found"
        })
    }

    everyMonth = cron.schedule('* * * Jan Sun', () => {
        sendmail(user.Email, "create your weekly task")
        createTodo()
    });

}

let EndeveryMonthSchdule = async (req, res) => {
    everyMonth.stop()
}

module.exports = {everydaySchdule,EndeverydaySchdule,everyWeekSchdule,EndEveryWeekSchdule,everyMonthSchdule,EndeveryMonthSchdule}