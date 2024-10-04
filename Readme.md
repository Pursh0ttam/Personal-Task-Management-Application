Task Manager
Description
The Task Manager is a robust and efficient application designed to help users manage their tasks. Users can sign up, log in, create tasks, and perform full CRUD operations (Create, Read, Update, Delete). The app also provides features for setting recurring tasks, tracking time spent on tasks, and sending notifications for pending tasks. With load balancing, the application ensures scalability and reliability for handling increased traffic.

Features
User Authentication: Users can sign up and log in securely.
Task Management:
Create, read, update, and delete tasks.
Recurring Tasks: Users can set tasks to repeat daily, weekly, or monthly.
Time Tracking: Track and analyze time spent on each task.
Email Notifications: Receive email notifications for pending tasks to keep you on schedule.
Load Balancer: Scalable and efficient handling of traffic to ensure smooth performance.
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT for secure login
Real-time Notifications: NodeMailer for sending email reminders
Task Scheduling: Node-schedule or cron jobs for recurring tasks
Load Balancer: Nginx or AWS Elastic Load Balancing (ELB)
Installation
Prerequisites
Node.js: Version 14.x or higher
MongoDB: Running locally or on a remote server
NPM or Yarn for package management
Steps to Install
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-manager.git
Change into the project directory:

bash
Copy code
cd task-manager
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the project root and add the following:
plaintext
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_secret_key
EMAIL_SERVICE=email_service_name
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
Start the application:

bash
Copy code
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
Track Time Spent: Each task will have a start and end time. The time spent on the task is automatically recorded and can be viewed on the dashboard.
Notifications
Pending Task Alerts: If a task is past its due date, an email notification is sent to remind you.
Email Integration: Notifications are handled through an email service configured in the environment variables.
Load Balancer
The application is configured to work with a load balancer (e.g., Nginx or AWS ELB) to manage traffic efficiently and ensure high availability.

Load Balancing Configuration
The app is designed to run behind a load balancer to distribute incoming requests and ensure stability.

Contact
If you have any questions or feedback, please feel free to reach out:

Email: kumarpurshottam474@gmail.com
