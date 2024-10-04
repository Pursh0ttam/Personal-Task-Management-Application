let JWT = require('jsonwebtoken')

let auth = (req, res, next) => {
  
    try {
      
        let token = req.cookies.access_token || req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(201).send({
                    success: false,
                    message: "Un-Autherized user"
                })
            } else {
                // console.log(decoded);
                req.body.id = decoded.id
                // console.log(req.body);
                next()
            }
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "please provide token",
            error
        })
    }
}

module.exports = auth