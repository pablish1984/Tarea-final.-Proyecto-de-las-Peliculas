const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    signupDate: Date,
    lastloginDate: Date

});

// La funcion pre se usa para definir un evento antes de ke se ejecute el salvar el usuario en la base de datos
userSchema.pre('save', (next) => {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    // Uso de el middleware bcrypt para encriptar la contrasenna para mi base de datos
    bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) return next(error);
    })

    user.password = hash;
    next();
})

module.exports = mongoose.model('UserSchema', userSchema);