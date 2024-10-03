const express = require("express");
const { tasksByprojectName, ProjectName } = require("../controller/organise.controller");

let projectNameroute = express.Router();

projectNameroute.post("/projectName", ProjectName);
projectNameroute.get("/tasksByprojectName/:id", tasksByprojectName);

module.exports = { projectNameroute };
