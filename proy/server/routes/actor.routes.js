const express = require('express');
const actorCtrl = require('../controller/actor.controller');
const router = express.Router();

// Ruta para obtener listado de actores
router.get('/', actorCtrl.getActors);

// Ruta para obtener un Actor
router.get('/:id', actorCtrl.getActorById);

// Ruta para insertar un actor
router.post('/', actorCtrl.createActor);

// Ruta para eliminar un actor
router.delete('/:id', actorCtrl.deleteActor);

// Ruta para actualizar actor
router.put('/:id', actorCtrl.updateActor);

module.exports = router;