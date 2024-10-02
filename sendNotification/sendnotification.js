require('dotenv').config();

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

let sendmail = async (email, pendingTask = [], msg) => {
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
        console.log("Email sent successfully:", setVal.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// sendMail('mpal6953@gmail.com', ['Task 1', 'Task 2', 'Task 3'], 'Please complete these tasks as soon as possible.');

// sendmail()
module.exports={sendmail}