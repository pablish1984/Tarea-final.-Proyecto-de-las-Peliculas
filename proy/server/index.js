const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const auth = require('./middlewares/auth.middleware');

const { mongoose } = require('./database.js');

// Settings
app.set('port', process.env.PORT || 3000);


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

// Routes
app.use('/api/movies', require('./routes/movies.routes'));
app.use('/api/actors', require('./routes/actor.routes'));
app.use('/api/directors', require('./routes/director.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.get('/api/private', auth, (req, res) => {
    res.json({ message: "Ya tienes acceso" });
});



// Starting my Server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ` + app.get('port'));
});