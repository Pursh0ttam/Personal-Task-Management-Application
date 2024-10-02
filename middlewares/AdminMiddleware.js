let userSchema = require('../model/userModel')


let adminMiddleware = async (req, res, next) => {

    try {
        console.log(req.body);
        let user = await userSchema.findById(req.body.id)
        console.log(user);
        if (user.userType !== "admin") {
            return res.status(401).send({
                success: false,
                message: "Un-autherized user"
            })
        }
        next()

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = adminMiddleware