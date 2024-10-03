const express = require("express");
const { tasksByprojectName, ProjectName } = require("../controller/OrganiseController");
const { labelName, tasksBylabelName } = require("../controller/labelController");

let labelroute = express.Router();

labelroute.post("/labelName", labelName);
labelroute.get("/tasksByprojectName/:id", tasksBylabelName);

module.exports = { labelroute };
