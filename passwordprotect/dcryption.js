let bcrypt = require('bcryptjs')

let dcryption=(password,hashpassword)=>{
   return bcrypt.compare(password,hashpassword)

}
module.exports=dcryption