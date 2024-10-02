let {hash,genSalt} = require('bcryptjs')
require('dotenv').config()

let encryption=async(password)=>{
    let salt = await genSalt(Number(process.env.salt_length))
    return await hash(password,salt)
}
module.exports = encryption