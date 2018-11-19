const actorModel = require('../model/actor.model');
const actorController = {};

// Obtener listado de actores
actorController.getActors = async(req, res) => {
    try {

        const list_actors = await actorModel.find();
        res.json(list_actors);

    } catch (error) {
        res.json(error);
    }

}

// Obtener actor por Id
actorController.getActorById = async(req, res) => {
    try {

        const singleActor = await actorModel.findById(req.params.id);
        res.json(singleActor);

    } catch (error) {
        res.json(error);
    }

}

// Insertar Actor
actorController.createActor = async(req, res) => {

    try {
        const actor = {
            name: req.body.name,
            nationality: req.body.nationality
        }

        const newActor = new actorModel(actor);
        await newActor.save();

        res.status(200).json({ message: "Actor Insertado" });
    } catch (error) {
        res.json(error);
    }

}

// Actualizar Actor
actorController.updateActor = async(req, res) => {

    try {
        const actor = {
            name: req.body.name,
            nationality: req.body.nationality
        }
        await actorModel.findByIdAndUpdate(req.params.id, actor);

        res.json({ message: 'Actor actualizado' });
    } catch (error) {
        res.json(error);
    }

}

// Eliminar Actor
actorController.deleteActor = async(req, res) => {
    try {
        const temp = await actorModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Eliminado correctamente" });

    } catch (error) {
        res.json(error);
    }

}

module.exports = actorController;