const { genSaltSync, hash } = require("bcryptjs");
const userModel = require("../model/user.model");


const resetpassword = async (req, res) => {
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
        console.log(error);
       return res.status(500).send({
            success: false,
            message: "error in reset password API",
            error
        })
    }

}
module.exports = { resetpassword }