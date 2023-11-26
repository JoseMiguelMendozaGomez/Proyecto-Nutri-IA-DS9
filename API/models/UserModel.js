const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    user: String,
    salt: String,
    password: String,
    name: String,
    date_created: Date,
})
const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel