const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true, min: 4},
    password: {type: String, required:true, min: 8}
})

const userModel = mongoose.model('User', UserSchema)

module.exports = userModel;