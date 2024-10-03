const express = require("express");
const { tasksByprojectName, ProjectName } = require("../controller/organise.controller");
const { labelName, tasksBylabelName } = require("../controller/label.controller");

let labelroute = express.Router();

labelroute.post("/labelName", labelName);
labelroute.get("/tasksBylabelName/:id", tasksBylabelName);

module.exports = { labelroute };
