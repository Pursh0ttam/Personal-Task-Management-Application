const { default: mongoose } = require("mongoose");


 const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`database connected ${mongoose.connection.host}`.bgGreen);
    } catch (error) {
        console.log(error);
    }

}

module.exports = mongodb