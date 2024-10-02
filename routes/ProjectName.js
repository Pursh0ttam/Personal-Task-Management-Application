const express = require("express");
const {tasksByprojectName,ProjectName} = require("../controller/OrganiseMiddleware");

let projectNameroute = express.Router();

projectNameroute.post("/projectName", ProjectName);
projectNameroute.get("/tasksByprojectName/:id", tasksByprojectName);

module.exports = { projectNameroute };
