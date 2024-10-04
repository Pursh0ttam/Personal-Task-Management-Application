const { default: mongoose } = require("mongoose");
const validator = require('validator');


let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required"]
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: [true, "Email is required"],
        minLength: 6,
        validate(value) {
            try {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('passowrd string should not set as password')
                }

                if (!validator.isStrongPassword(value))
                    console.log("password error");

            } catch (error) {
                console.log(error);
            }
        }
    },
    address: {
        type: Array
    },
    phone: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: true,
        validate(value) {
            if (!validator.isNumeric(value.toString())) {
                throw new Error('mobile ')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
  
}, { timestamps: true })



module.exports = mongoose.model('User', userSchema)