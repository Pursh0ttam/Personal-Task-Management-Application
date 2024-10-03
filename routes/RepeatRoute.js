const express = require("express");
const { everydaySchdule, EndeverydaySchdule, everyWeekSchdule, EndEveryWeekSchdule, everyMonthSchdule, EndeveryMonthSchdule } = require("../controller/RepeatController");


let repeatroute = express.Router();

repeatroute.post("/everydaySchdule", everydaySchdule);
repeatroute.post("/EndeverydaySchdule", EndeverydaySchdule);
repeatroute.post("/everyWeekSchdule", everyWeekSchdule);
repeatroute.post("/EndEveryWeekSchdule", EndEveryWeekSchdule);
repeatroute.post("/everyMonthSchdule", everyMonthSchdule);
repeatroute.post("/EndeveryMonthSchdule", EndeveryMonthSchdule);


module.exports = { repeatroute };
