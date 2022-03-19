const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    member : {
        type: Boolean,
        default : false

    }
})

const User = mongoose.Model(User, userSchema)

exports.module = User;