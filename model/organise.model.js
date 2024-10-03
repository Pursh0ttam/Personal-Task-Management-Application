const {Schema , mongoose } = require("mongoose");

let OrganiseSchema = new Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    description:{
        type:String
    }

})

module.exports= mongoose.model('organise',OrganiseSchema)