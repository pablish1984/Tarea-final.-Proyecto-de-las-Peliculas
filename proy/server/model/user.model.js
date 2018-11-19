const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true }

});

module.exports = mongoose.model('UserSchema', userSchema);