const express = require('express');
const router = express.Router();
const directorCtrl = require('../controller/director.controller');

// Ruta para ke devuelva listado de directores
router.get('/', directorCtrl.getDirectors);

// Ruta para obtener un director especifico
router.get('/:id', directorCtrl.getDirectorById);

// Ruta para insertar un director
router.post('/', directorCtrl.createDirector);

// Ruta para eliminar un director
router.delete('/:id', directorCtrl.deleteDirector);

// Ruta para actualizar un director
router.put('/:id', directorCtrl.updateDirector);

module.exports = router;