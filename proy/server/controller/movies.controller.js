const moviesModel = require('../model/movies.model')
const moviesController = {};

// Obtener una pelicula por el Id
moviesController.getMovieById = async(req, res) => {

    try {
        const temp = await moviesModel.findById(req.params.id).populate('director', '-_id -__v').populate('actors', '-_id -__v');

        res.json(temp);
    } catch (error) {
        res.json(error);
    }
}

// Listado de peliculas por Campos
moviesController.getMoviesByFields = async(req, res) => {
    var params = {}; // Objeto json que me guarda los campos con los valores para pasarlo a mi consulta

    for (key in req.query) {
        req.query != "" ? params[key] = req.query[key] : null; // Si la url trae parametros pues los annade a el objeto params
    }

    // Uso del metodo find(), pasandole parametros para filtrar mi buskeda
    await moviesModel.find({ $or: [params] }).populate('director actors', '-_id -__v').populate({
        path: 'list_users_calification.user',
        populate: { path: 'user' }
    }).exec((err, movies) => {
        if (movies) {
            res.json(movies);
        } else
            res.status(404).json({ message: 'No existen peliculas' });
    });
}

// Crear una pelicula
moviesController.createMovie = async(req, res) => {
    try {

        const temp = {
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            genero: req.body.genero,
            annyo: req.body.annyo,
            pais_produccion: req.body.pais_produccion,
            duracion: req.body.duracion,
        }

        const singleMovie = new moviesModel(req.body);

        await singleMovie.save();

        res.send('Se ha creado la pelicula correctamente');
    } catch (error) {
        res.send(error);
    }
}

// Eliminar una pelicula
moviesController.deleteMovie = async(req, res) => {
    try {
        await moviesModel.findOneAndRemove(req.params.id);

        res.send('Pelicula eliminada correctamente');
    } catch (error) {
        res.send(error);
    }
}

// Actualizar una pelicula
moviesController.updateMovie = async(req, res) => {
    try {
        await moviesModel.findOneAndUpdate(req.params.id, req.body);

        res.send('Pelicula Actualizada');
    } catch (error) {
        res.send(error);
    }
}

moviesController.SetScore = async(req, res) => {

    try {
        // Obtengo el arreglo de usuarios ke le han dado score a una pelicula
        var list_users = await moviesModel.findById(req.params.id, { "list_users_calification": 1 });

        // Guardo la cantidad de usuarios hay en el arreglo y creo un nuevo objeto con la info nueva a insertar
        var count = list_users.list_users_calification.length;
        var aux_obj = {
            user: req.user,
            personal_score: req.body.score
        }

        // Recorro el arreglo buscando si el usuario logeado le dio score ya a la pelicula.SI YA LE DIO SCORE, PUES ELIMINO ESE REGISTRO VIEJO E INSERTO EL NUEVO. SI NO EXISTE PUES ANNADO AL FINAL DEL ARREGLO EL NUEVO SCORE. En otro momento se hara una llamada a recalcular el score total de la pelicula
        for (let index = 0; index < count; index++) {
            if (list_users.list_users_calification[index]._id === req.user._id) {
                list_users.list_users_calification.splice(index, 1, aux_obj);
            } else {
                list_users.list_users_calification.push(aux_obj);
            };

        }

        // Salvo la informacion de nuevo a la base de datos
        var saved = await moviesModel.findByIdAndUpdate(req.params.id, { $set: { list_users_calification: list_users.list_users_calification } })
        res.json(saved);

    } catch (error) {
        res.json(error);
    }
}

moviesController.computeScore = async(req, res) => {
    try {

        // Busco todos los USUARIOS ke me han evaluado la pelicula para CALCULAR EL SCORE PROMEDIO
        var array_users = await moviesModel.findById(req.params.id, { "list_users_calification": 1 });
        var total_score = 0;

        // Obtengo la cantidad de usuarios ke han dado Score a la pelicula
        var count = array_users.list_users_calification.length;

        // Hallo el promedio de Score de la pelicula
        array_users.list_users_calification.forEach(element => {
            total_score += element.personal_score;
        });

        var final_score = total_score / count;

        // Una vez calculado el SCORE, Actualizar el valor en el documento
        const saved = await moviesModel.findByIdAndUpdate(req.params.id, {
            $set: { score: final_score }
        }, { new: true });

        if (saved) {
            res.json(saved);
        }
    } catch (error) {
        res.json(error);
    }
}

moviesController.getScore = async(req, res) => {

    try {
        // Devuelvo el Score total de la pelicula y muestro una lista con los scores de los distintos usuarios 
        var movie = await moviesModel.findById(req.params.id, { "score": 1, "list_users_calification": 1 }); //findById(req.params.id);

        res.json(movie);
    } catch (error) {
        res.json(error);
    }
}

module.exports = moviesController;