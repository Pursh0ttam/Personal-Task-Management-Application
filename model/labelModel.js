const { Schema,default: mongoose } = require("mongoose");


let labelSchema = new Schema({
    title:{
        type:String,
        required:true
    }
})

module.export = mongoose.model('label',labelSchema)