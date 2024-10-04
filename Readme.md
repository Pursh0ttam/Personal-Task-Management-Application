---------Task Manager

 Description
The Task Manager is a robust and efficient application designed to help users manage their tasks. Users can sign up, log in, create tasks, and perform full CRUD operations (Create, Read, Update, Delete). The app also provides features for setting recurring tasks, tracking time spent on tasks, and sending notifications for pending tasks. With load balancing, the application ensures scalability and reliability for handling increased traffic.

-------Features
User Authentication: Users can sign up and log in securely.
Task Management:
Create, read, update, and delete tasks.
Recurring Tasks: Users can set tasks to repeat daily, weekly, or monthly.
Time Tracking: Track and analyze time spent on each task.
Email Notifications: Receive email notifications for pending tasks to keep you on schedule.
Load Balancer: Scalable and efficient handling of traffic to ensure smooth performance.

----------Technologies Used
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT for secure login
Real-time Notifications: NodeMailer for sending email reminders
Task Scheduling: node-cron for recurring tasks
Load Balancer: Nginx or AWS Elastic Load Balancing (ELB)

Installation
Prerequisites
Node.js: Version 14.x or higher
MongoDB: Running locally or on a remote server
NPM 
Steps to Install
Clone the repository:


git clone https://github.com/Pursh0ttam/task-app.git
Change into the project directory:


cd task-app
Install dependencies:

npm install
Set up environment variables:

Start the application:

npm start

Usage
Sign Up & Log In
Sign Up: Create an account by providing a unique email and password.
Log In: Authenticate using your email and password to gain access to your tasks.
Task Management
Create Task: Add a new task by specifying its title, description, due date, and priority.
Edit Task: Update details of any existing task.
Delete Task: Remove any task from the list.
View Tasks: View all your tasks, filter them by due date, priority, or status.

Recurring Tasks
Create tasks that repeat daily, weekly, or monthly to automate scheduling of routine activities.

Time Tracking
Track Time Spent: Each task will have a start and end time. The time spent on the task is recorded and can be viewed on the dashboard.

Notifications
Pending Task Alerts: If a task is past its due date, an email notification is sent to remind you.
Email Integration: Notifications are handled through an email service configured in the environment variables.


Load Balancer

The application is configured to work with a load balancer (eg,node:cluster) to manage traffic efficiently and ensure high availability

Load Balancing Configuration
The app is designed to run behind a load balancer to distribute incoming requests and ensure stability.

Contact
If you have any questions,please feel free to reach out:

Email: kumarpurshottam474@gmail.com
