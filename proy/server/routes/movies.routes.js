const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const moviesCtrl = require('../controller/movies.controller');

// Ruta ke me devuelve el listado de las peliculas
router.get('/', moviesCtrl.getMoviesByFields);

// Ruta ke devuelve una pelicula por el Id
router.get('/:id', moviesCtrl.getMovieById);

//Ruta para obtener el score de la pelicula
router.get('/:id/scoremovie', moviesCtrl.getScore);

//Ruta para actualiozar el score de la pelicula
router.put('/:id/scoremovie', moviesCtrl.computeScore);


// Ruta para crear una pelicula
router.post('/', moviesCtrl.createMovie);

// Ruta para actualizar una pelicula
router.put('/:id', moviesCtrl.updateMovie);

// Ruta para eliminar una pelicula
router.delete('/:id', moviesCtrl.deleteMovie);


module.exports = router;