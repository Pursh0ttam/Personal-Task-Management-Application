const express = require('express');
const auth = require('../middlewares/auth');
const {registrationController,loginController }= require('../controller/registrationController');
const { getusercontroller, updateUser,resetpassword, deleteUser, getAllusercontroller  } = require('../controller/getuserController');
const updatepasword = require('../controller/updatepassword');

let UserRouter = express.Router()

UserRouter.post('/userregister',registrationController)
UserRouter.post('/userlogin',loginController)

UserRouter.get('/getAllUser',auth,getAllusercontroller)
UserRouter.get('/getSingleUser',auth,getusercontroller)
UserRouter.put('/updateUser',auth,updateUser)
UserRouter.post('/resetpassword',auth,resetpassword)
UserRouter.post('/updatepassword',auth,updatepasword)
UserRouter.delete('/deleteUser/:id',auth,deleteUser)

//logOut from all browsers




module.exports = UserRouter