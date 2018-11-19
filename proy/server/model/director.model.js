const mongoose = require('mongoose');
const { Schema } = mongoose;

const DirectorSchema = new Schema({
    name: { type: String, require: true },
    nationality: { type: String, require: true }
});

module.exports = mongoose.model('DirectorSchema', DirectorSchema);