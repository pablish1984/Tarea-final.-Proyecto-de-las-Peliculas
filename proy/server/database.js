const mongoose = require('mongoose');

const URI = "mongodb://localhost/mean-Peliculas";

const option = {
    "useNewUrlParser": true
}

mongoose.connect(URI, option)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

mongoose.con

module.exports = mongoose;