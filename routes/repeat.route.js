const express = require("express");
const { everydaySchdule, EndeverydaySchdule, everyWeekSchdule, EndEveryWeekSchdule, everyMonthSchdule, EndeveryMonthSchdule } = require("../controller/repeat.controller");
const auth = require("../middlewares/auth");


let repeatroute = express.Router();

repeatroute.post("/everydaySchdule",auth, everydaySchdule);
repeatroute.post("/EndeverydaySchdule",auth, EndeverydaySchdule);
repeatroute.post("/everyWeekSchdule", everyWeekSchdule);
repeatroute.post("/EndEveryWeekSchdule", EndEveryWeekSchdule);
repeatroute.post("/everyMonthSchdule", everyMonthSchdule);
repeatroute.post("/EndeveryMonthSchdule", EndeveryMonthSchdule);


module.exports = { repeatroute };
