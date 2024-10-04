require('dotenv').config();

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

let sendmail = async (email,msg, pendingTask = []) => {
    try {
        let taskList = pendingTask.map(task => task.title);
        let setVal = await transport.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Please complete your pending tasks",
            html: `
                <h1>These are your pending tasks</h1>
                <ul>${taskList}</ul>
                <p>${msg}</p>
            `
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


module.exports={sendmail}