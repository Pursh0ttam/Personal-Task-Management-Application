const userModel = require("../model/userModel")
const { sendmail } = require("../sendNotification/sendnotification")
const { createTodo } = require("./todoController")


let everyday
let everydaySchdule = async (req, res) => {
    const { id } = req.body
    let user = await userModel.findById(id)
    if (!user) {
        return res.send({
            success: false,
            message: "user not found"
        })
    }

    everyday = cron.schedule('* * * * sun mon tue wed thr fri sat sun', () => {
        sendmail(user.Email, "create your weekly task")
        createTodo()
    })
}

//end the task
let EndeverydaySchdule = async (req, res) => {
    everyday.stop()
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