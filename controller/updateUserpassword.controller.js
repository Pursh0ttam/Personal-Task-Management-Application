const { genSalt, hash, genSaltSync, compare } = require("bcryptjs")
const userModel = require("../model/user.model")

const updatepassword = async (req, res) => {
    try {
        const { newpassword, oldpassword } = req.body
        if (!newpassword || !oldpassword) {
            res.status(500).send({
                success: false,
                message: "oldpassword and newpassword is required"
            })
        }

        let user = await userModel.findById({ _id: req.body.id })
        console.log(user);
        if (!user) {
           return res.status(500).send({
                success: false,
                message: "user not found"
            })
        }

        let isMatch=await compare(oldpassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "oldpassword is wrong"
            })
        }
        console.log(isMatch);

        let salt = genSaltSync(8)
        let hashpassword = await hash(newpassword, salt)
        user.password = hashpassword
        await user.save()
        console.log(user);
        res.send({
            success:true,
            message:"password updated successfully",user
        })

    } catch (error) {
       return res.status(500).send({ error: true, message: error.message })
    }

}

module.exports = updatepassword