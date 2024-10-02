const express = require("express");
const {tasksByprojectName,ProjectName} = require("../controller/OrganiseMiddleware");

let labelroute = express.Router();

labelroute.post("/projectName", ProjectName);
labelroute.get("/tasksByprojectName/:id", tasksByprojectName);

module.exports = { labelroute };
