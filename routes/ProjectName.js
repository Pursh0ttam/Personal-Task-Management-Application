const express = require("express");
const { tasksByprojectName, ProjectName } = require("../controller/OrganiseController");

let projectNameroute = express.Router();

projectNameroute.post("/projectName", ProjectName);
projectNameroute.get("/tasksByprojectName/:id", tasksByprojectName);

module.exports = { projectNameroute };
