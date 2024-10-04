const express = require('express');
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongodb = require("./config/db");
const todoRoute = require("./routes/todo.route");
const UserRouter = require("./routes/user.route");
const { projectNameroute } = require("./routes/projectName.route");
const { labelroute } = require("./routes/label.route");
const { repeatroute } = require("./routes/repeat.route");
const cookieParser = require("cookie-parser");
const cluster = require('node:cluster');



//^env configuration
dotenv.config();

//^mongodb connection
mongodb();


// to balance load 
let os= require("os")
const totalCpu = os.cpus().length
if (cluster.isPrimary) {
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();  
 }
 } else {

let app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//^User Registration && CRUD Operation
app.use("/api/v1", UserRouter);

// ^Project FolderName
app.use("/api/v1/projectName", projectNameroute);

// ^ Label Route
app.use("/api/v1/label", labelroute);

//^ CRUD on Tasks
app.use("/api/v1/todo", todoRoute);

//^ repeat Tasks
app.use("/api/v1/repeat", repeatroute);

//^Route not found
app.use("*", (req, res, next) => {
  res.status(404).send({ error: true, message: "Route Not Found" });
});

//^ Error Handling Middleware

app.use((error, req, res, next) => {
  res.status(500).send({
    error: true,
    message: error.message
  });
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`.bgBlue.blue);
});

 }