const mongoose = require('mongoose');
const { Schema } = mongoose;
//var User = require('./user.model');
//var Director = require('./director.model');
//var Actor = require('./actor.model');

const MovieSchema = new Schema({
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    genero: { type: String, required: true },
    annyo: { type: String, required: false },
    pais_produccion: { type: String, required: true },
    duracion: { type: Number, required: true },

    // Lista de todos los usuarios ke han calificado la pelicula y el score ke le han dado, usado para determinar el score total de la pelicula
    list_users_calification: [{
        // Con la primera declaracion logro ke no me cree el campo (id) en esta subcoleccion
        _id: false,
        user: { type: Schema.ObjectId, ref: "UserSchema" },
        personal_score: { type: Number, required: false }
    }],
    score: { type: Number, required: false },

    // Para el caso del director y el actor, aki son de tipo String porke van a ser URIs o Id (preguntar a Dago sugerencia) al actor y al director en la base de datos. La imagen es igual, es una URI, al archivo imagen.
    director: { type: Schema.Types.ObjectId, ref: "DirectorSchema" },
    actors: [{ type: Schema.Types.ObjectId, ref: "ActorSchema" }],
    image: { type: String, required: false }
})

module.exports = mongoose.model('MoviesSchema', MovieSchema);