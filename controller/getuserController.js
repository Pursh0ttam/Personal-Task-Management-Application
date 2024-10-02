const userModel = require("../model/userModel")



let getAllusercontroller = async (req, res,next) => {
    try {
        let id = req.body.id
        if (!id) {
            res.status(500).send("UnAuthrize user")
        }
        let userVAlue = await userModel.find({})
        if (!userVAlue) {
           return res.status(400).send("user not found")
        }
        userVAlue.password = undefined
        return res.status(200).send({
            success: true,
            message: "All users fetched successfully",
            userVAlue
        })


    } catch (error) {
        next(error)
    }
}

let getusercontroller = async (req, res,next) => {
    try {
        let id = req.body.id
        let userVAlue = await userModel.findById(id)
        if (!userVAlue) {
            return  res.status(400).send("user not found")
        }
        userVAlue.password = undefined
        return  res.status(200).send({
            success: true,
            message: "user founded successfully",
            userVAlue
        })


    } catch (error) {
        next(error)
    }
}

let updateUser = async (req, res,next) => {
    try {
        let user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return   res.status(404).send({
                success: false, message: "user not found"
            })
        }
        let { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.address = phone
        await user.save()
        return res.status(201).send({
            success: true,
            message: "user updated", user
        })

    } catch (error) {
        next(error)
    }
}

const resetpassword = async (req, res,next) => {
    try {
        const { Email, newpassword, answer } = req.body
        if (!Email || !newpassword || !answer) {
            return res.status(500).send({
                success: false,
                messagwe: "please fill all the fields",

            })
        }
        const user = await userModel.findOne({ Email, answer })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email or answer is incorrect",
            })
        }
        let salt = genSaltSync(8)
        let hashpassword = await hash(newpassword, salt)
        user.password = hashpassword
        await user.save()
        return res.status(200).send({
            success: true,
            message: "password updated successfully",
            user
        })

    } catch (error) {
        next(error)
    }

}

const deleteUser = async (req, res,next) => {
    console.log(req);
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "user deleted successfully"
        })
    } catch (error) {
        next(error)
    }


}


module.exports = { getusercontroller, getAllusercontroller,updateUser, resetpassword, deleteUser }